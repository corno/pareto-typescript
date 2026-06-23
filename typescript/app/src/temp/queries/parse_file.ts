import * as p_ from 'pareto-core/dist/implementation/query'
import * as p_i from 'pareto-core/dist/interface/data'
import * as p_t from 'pareto-core/dist/implementation/transformer'

import p_query from 'pareto-core/dist/implementation/query/__internal/query'
import p_query_result from 'pareto-core/dist/implementation/query/__internal/query_result'

//interface
import * as resources from "lib/dist/modules/typescript_parser/interface/queries"


import * as d_ast from "lib/dist/modules/typescript_parser/interface/data/ast"

import * as ts from "typescript"
import * as fs from "fs"

class My_Node_Implementation implements d_ast.Node {
    private tsNode: ts.Node

    constructor(tsNode: ts.Node) {
        this.tsNode = tsNode
    }

    get kind(): string {
        return ts.SyntaxKind[this.tsNode.kind]
    }

    get children(): p_i.List<d_ast.Node> {
        const sourceFile = this.tsNode.getSourceFile()
        return p_.literal.list(
            this.tsNode.getChildren(sourceFile).map(
                child => {
                    const x: d_ast.Node = new My_Node_Implementation(child)
                    return x
                }
            )
        )
    }

    get location(): { line: number; column: number } {
        const sourceFile = this.tsNode.getSourceFile()
        const pos = this.tsNode.getStart(sourceFile)
        const lineAndChar = sourceFile.getLineAndCharacterOfPosition(pos)
        return {
            line: lineAndChar.line,
            column: lineAndChar.character
        }
    }

    get comments() {
        const sourceFile = this.tsNode.getSourceFile()
        const fullText = sourceFile.getFullText()
        const comments: string[] = []

        // Get leading comments (before the node)
        const leadingComments = ts.getLeadingCommentRanges(fullText, this.tsNode.pos)
        if (leadingComments) {
            leadingComments.forEach(comment => {
                comments.push(fullText.substring(comment.pos, comment.end))
            })
        }

        // skip trailing comments to avoid duplicates, as they are already captured in the leading comments of the next node


        return p_.literal.list(comments)
    }
}


export const $$: resources.queries.parse_file = p_query(
    ($) => {
        return p_query_result(
            (on_value) => {

                const data = $.data

                // Read the file and parse it with TypeScript
                const sourceFile = ts.createSourceFile(
                    "input.ts",
                    data,
                    ts.ScriptTarget.Latest,
                    true // setParentNodes
                )

                // Get trailing comments at the end of the file
                const fullText = sourceFile.getFullText()
                const trailingComments = ts.getTrailingCommentRanges(fullText, sourceFile.end)
                const trailingCommentsArray: string[] = []
                if (trailingComments) {
                    trailingComments.forEach(comment => {
                        trailingCommentsArray.push(fullText.substring(comment.pos, comment.end))
                    })
                }

                on_value(
                    {
                        'ast': {
                            'root': new My_Node_Implementation(sourceFile),
                            'trailing comments': p_.literal.list(trailingCommentsArray)
                        }
                    }
                )
            }
        )
    }
)