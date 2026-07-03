# pareto-typescript error fixing workflow

## The big picture

We are reverse-engineering the TypeScript AST into a typed schema. The tool `analyze_file.js` walks a `.ts` file using the TypeScript compiler API and tries to parse each node using the schema/refiner. Errors mean a node kind or structure was not yet handled.

## Scanning a codebase for errors

```bash
# From packages/pareto-typescript:
find ../../../typescript_codebases/TypeScript/src/ -name "*.ts" -type f \
  -not -path "*/node_modules/*" -not -path "*/dist/*" \
  -exec node ./typescript/app/dist/bin/analyze_file.js {} \; \
  > /dev/null 2> ./temp/out_ts_src.txt

# Show unique errors:
sort -u ./temp/out_ts_src.txt | grep "^processing error:"
```

Or use the faster multithreaded batch tool:
```bash
node ./temp/analyze_files_in_batch.js ../../../typescript_codebases/TypeScript/src/ 2> ./temp/out_ts_src.txt
```

Other available corpora: `lionweb-typescript/`, `pareto_canon/` etc.

## Error format

Each error has a path, a message, a source location, and an AST snippet:
```
processing error: Parameters.open parenthesis token: assertion failed (expected: OpenParenToken, found: LessThanToken) @ path/to/file.ts:10:5:
    snippet:
    Node: FunctionDeclaration
        Node: LessThanToken
        Node: SyntaxList
            ...
        Node: GreaterThanToken
        Node: OpenParenToken
```

Error message types:
- `unknown option: 'GetAccessor'` — unhandled node kind in a `peek_for_state` switch
- `assertion failed (expected: X, found: Y)` — unexpected node at that position (usually a missing optional field before it)
- `missing: X` — expected node was not found (e.g. colon in `{ a }` interface property — use `Optional_Type`)
- `not a leaf: 'SyntaxList'` — tried to `consume_literal()` on a non-leaf node
- `not a leaf: 'Decorator'` — Decorator has children (AtToken + expression), needs `consume_and_parse_children_as_type`
- `dangling child: X` — a child was left unconsumed; the schema is missing a field for it

**Reading the snippet**: The top node is the one being parsed. Its direct children are listed at one indent level; children of children are shown with `...` (collapsed). The error occurs when the refiner tries to consume a child but finds an unexpected node kind.

## Diagnosing: "assertion failed (expected: X, found: Y)"

This means the refiner consumed the preceding fields correctly, then hit node Y where it expected X. **Y is an unhandled optional field** that appears before X in the AST. Add a `peek_for_optional("Y", ...)` in the refiner (and the corresponding field in the schema) immediately before the field that fails.

## Build command

```bash
# From packages/pareto-typescript:
pdt package . build-and-test; echo "EXIT:$?"
# Or from workspace root:
pdt package ./packages/pareto-typescript build-and-test; echo "EXIT:$?"
```
EXIT:0 = success.

## The 3 files to edit

- **Schema**: `typescript/lib/src/interface/data/typed_ast.ts`
- **Refiner**: `typescript/lib/src/implementation/manual/refiners/typed_ast/ast.ts`
- **Transformer**: `typescript/lib/src/implementation/manual/transformers/typed_ast/fountain_pen.ts`

## Productions vs Refiners

**Production** — consumes from an **iterator** (multiple siblings). Uses `create_iterator_context`.
```typescript
export const Foo: h.Production<d_out.Foo> = (iterator, abort, $p) =>
    h.create_iterator_context(iterator, abort, $p, "Foo", (context) => ({ ... }))
```

**Refiner** — consumes from a **single node** (its children). Uses `create_node_context` + `parse_children_as_type`.
```typescript
export const Foo: h.Refiner<d_out.Foo> = ($, abort, $p) =>
    h.create_node_context($, abort, $p, "NodeKind", (context): d_out.Foo =>
        context.parse_children_as_type((context): d_out.Foo => ({ ... }))
    )
```

`parse_children_as_type` is only available inside `create_node_context`.

Called from refiner: use `context.prop("x").defer_parsing_to_component(Foo)` for Productions, `context.prop("x").consume_component(Foo)` for Refiners.

## Key API (refiner/production context)

| Call | Effect |
|---|---|
| `context.prop("name")` | **Path label only** — no consumption, no side effects |
| `context.option("name")` | **Path label only** — no consumption, no side effects |
| `context.peek_for_optional("Kind", fn)` | Peek: if next node is "Kind", consume it and call fn |
| `context.peek_for_state((kind, abort) => ...)` | Peek at next node kind, dispatch via switch |
| `context.assert_kind("X").consume_keyword()` | Assert node kind then consume as keyword |
| `context.consume_keyword()` | Consume current node as keyword (no kind check) |
| `context.consume_literal()` | Consume current node as literal (must be a leaf) |
| `context.defer_parsing_to_component(Foo)` | Pass iterator to Production `Foo` |
| `context.consume_component(Foo)` | Consume this node, pass it to Refiner `Foo` |
| `context.consume_and_parse_children_as_type(fn)` | Consume node, recurse into its children |
| `context.consume_and_parse_children_as_separated_list("Sep", fn)` | SyntaxList with separators |
| `context.consume_and_parse_children_as_non_separated_list(fn)` | SyntaxList without separators |

## peek_for_optional patterns

**Single optional token** (e.g. `?`, `*`, `!`):
```typescript
// schema
'asterisk token': p_.Optional_Value<d_primitives.Keyword>
// refiner
'asterisk token': context.prop("asterisk token").peek_for_optional(
    "AsteriskToken",
    (context) => context.consume_keyword()
),
```

**Optional object with multiple sibling fields** (fn receives the outer context, consumes siblings):
```typescript
// schema
'initializer': p_.Optional_Value<{ 'equals token': d_primitives.Keyword; 'expression': Expression }>
// refiner — fn returns a plain object, NOT consume_and_parse_children_as_type
'initializer': context.prop("initializer").peek_for_optional(
    "EqualsToken",
    (context) => ({
        'equals token': context.prop("equals token").assert_kind("EqualsToken").consume_keyword(),
        'expression': context.prop("expression").defer_parsing_to_component(Expression),
    })
),
```

**Optional component node** (the node itself is an optional child):
```typescript
'body': context.prop("body").peek_for_optional(
    "Block",
    (context) => context.consume_component(Block)
),
```

## Common AST patterns

- **Variance modifiers** (`in T`, `out T`, `const T`): TypeParameter may have a SyntaxList of modifier keywords before the Identifier. Check via `peek_for_optional("SyntaxList", ...)`.
- **Generator functions** (`function*`, `*method()`): `AsteriskToken` appears after `function` keyword or modifiers, before the name.
- **Optional method names**: `export default function() {}` — Identifier is absent. Use `peek_for_optional("Identifier", ...)`.
- **JSDoc on statements**: Some statement kinds (e.g. `if`) carry JSDoc as first child.
- **RestType**: Children are `DotDotDotToken` then the type — both must be consumed.
- **ConstructorType** with generics: `new<T>()` — has `LessThanToken` before `OpenParenToken`.
- **Decorator** (`@expr`): Not a leaf — children are `AtToken` + expression. Use `consume_and_parse_children_as_type`. Applies in `Binding_Pattern.modifiers`, `Class.modifiers`, `Statement_Modifiers`, etc.
- **Class with decorator**: `SyntaxList` appears before `ClassKeyword` when a class has decorators. Use `peek_for_optional("SyntaxList", ...)`, NOT a made-up kind like `"Class_Member_Modifiers"`.
- **`for await`**: `AwaitKeyword` appears between `ForKeyword` and `OpenParenToken` for `for await (... of ...)` loops. Make it optional with `peek_for_optional("AwaitKeyword", ...)`.
- **`PrivateIdentifier`**: Valid in `Property_Name` positions (e.g. `#x` in class members). Add as a case alongside `Identifier`.
- **`EndOfFileToken` with children**: In `.js` files ending with a JSDoc comment, `EndOfFileToken` has a JSDoc child. Use `consume_and_parse_children_as_type` not `consume_keyword()`.
- **Dotted namespace** (`namespace A.B {}`): AST is `[NamespaceKeyword, Identifier(A), DotToken, ModuleDeclaration(B {})]`. The `DotToken` is followed by a nested `ModuleDeclaration`, not a bare Identifier.
- **`ExportAssignment`**: Covers both `export default expr` (has `DefaultKeyword`) and `export = expr` (has `EqualsToken`). Use `peek_for_state` to distinguish.
- **Missing colon in property signature** (`{ a }` in interface): `ColonToken` and type are both absent. Use the existing `Optional_Type` schema type (`p_.Optional_Value<{ 'colon token', 'type' }>`) instead of asserting `ColonToken`.
- **Module specifier as template** (invalid code): `import x from \`...\`` — TypeScript error recovery produces `TemplateExpression` where `StringLiteral` is expected. Use a `Module_Specifier` union type (`['string literal', ...]` | `['template', ...]`).

## Our collaboration protocol

1. **User provides the error output** (from `out_ts_src.txt` or similar)
2. **Read the snippet** — the AST structure is usually enough to diagnose without a test file
3. **If unclear, write a minimal `/tmp/test_X.ts`** and run `analyze_file.js` on it
4. **Fix all 3 files** (schema + refiner + transformer) — apply with `multi_replace_string_in_file`
5. **Build** with `pdt package . build-and-test; echo "EXIT:$?"`
6. **Re-scan** with the full corpus to verify the error count drops

## Cost tip

Long chat histories increase the per-turn cost significantly. The repo memory file (`/memories/repo/pareto-typescript-workflow.md`) captures the essential patterns. Starting a new chat periodically (pointing it to this WORKFLOW.md and the current `out_ts.txt`) is cheaper than continuing an old conversation with a large summarised history.
