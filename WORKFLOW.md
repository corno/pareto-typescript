# pareto-typescript error fixing workflow

## The big picture

We are reverse-engineering the TypeScript AST into a typed schema. The tool `analyze_file.js` walks a `.ts` file using the TypeScript compiler API and tries to parse each node using the schema/refiner. Errors mean a node kind or structure was not yet handled.

## The error file

Errors come from running a full scan of a codebase (e.g. lionweb-typescript):
```
cd packages/pareto-typescript
find ../../../typescript_codebases/lionweb-typescript/ -name "*.ts" -type f \
  -not -path "*/node_modules/*" -not -path "*/dist/*" \
  -exec node ./typescript/app/dist/bin/analyze_file.js {} \; \
  > /dev/null 2> out_lionweb.txt
grep -v "^$" out_lionweb.txt | sort -u
```
Each line is one error. Errors look like:
- `Expression|object literal.properties: unknown option: 'GetAccessor'` — unhandled AST node kind
- `Arguments.open parenthesis token: missing: OpenParenToken` — expected token not found
- `Expression|arrow function|without parentheses.parameter: assertion failed (expected: Parameter, found: AsyncKeyword)` — wrong node at that position

## Seeing the AST for an error

1. Write a minimal `/tmp/test_X.ts` that triggers the error (e.g. `const x = new Foo` for missing OpenParenToken)
2. Run from workspace root:
   ```
   node ./packages/pareto-typescript/typescript/app/dist/bin/analyze_file.js /tmp/test_X.ts
   ```
3. The error output shows the AST path and the offending node kind, plus the node tree (parent→child). Use this to understand what children to expect.

## Build command (from workspace root `/home/corno/workspace/pareto-canon`)
```
pdt package ./packages/pareto-typescript build-and-test; echo "EXIT:$?"
```
EXIT:0 = success.

## The 3 files to edit

- **Schema**: `typescript/lib/src/interface/data/typed_ast.ts`
- **Refiner**: `typescript/lib/src/implementation/manual/refiners/typed_ast/ast.ts`
- **Transformer**: `typescript/lib/src/implementation/manual/transformers/typed_ast/fountain_pen.ts`

## Key API rules (refiner `ast.ts`) — CRITICAL

- `context.prop("name")` — **path label only**, NO side effects, NO consumption
- `context.option("name")` — **path label only**, NO side effects, NO consumption
- `context.optional("TokenKind", fn)` — **actually peeks and optionally consumes** a node
- `context.peek_for_state((kind, abort) => ...)` — peeks at next node kind, branches
- `context.assert_kind("X").consume_keyword()` — assert kind then consume
- `context.defer_parsing_to_component(Foo)` — delegate to another Production
- `context.consume_component(Foo)` — consume current node as component
- `context.consume_literal()` — consume a literal value node
- `context.consume_and_parse_children_as_type(fn)` — consume node, recurse into children
- `context.consume_and_parse_children_as_separated_list("Sep", fn)` — SyntaxList with separators

## Optional pattern model

```typescript
// schema
export type Optional_Foo = p_.Optional_Value<Foo>

// refiner
export const Optional_Foo: h.Production<d_out.Optional_Foo> = (iterator, abort, $p) =>
    h.create_iterator_context(iterator, abort, $p, "Optional_Foo",
        (context): d_out.Optional_Foo => context.optional("OpenTokenKind", (context) => ({
            'field': context.prop("field").consume_keyword(),
        }))
    )
```

## Our collaboration protocol

1. **User states the error** (copy from `out_lionweb.txt`)
2. **I create a minimal test file and run analyze_file** to show the AST
3. **I propose the fix** across schema + refiner + transformer — user approves or corrects
4. **I implement** and build to verify
