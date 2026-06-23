import * as p_i from 'pareto-core/dist/interface/data'
import * as p_ from 'pareto-core/dist/implementation/transformer'

import * as d_ast from "lib/dist/modules/typescript_parser/interface/data/ast"

import * as ts from "typescript"

class My_Node_Implementation implements d_ast.Node {
    private tsNode: ts.Node

    constructor(tsNode: ts.Node) {
        this.tsNode = tsNode
    }

    get kind(): string {
        return ts.SyntaxKind[this.tsNode.kind]
    }

    get children(): p_i.List<d_ast.Node> {
        return p_.literal.list(
            this.tsNode.getChildren().map(
                child => {
                    const x: d_ast.Node = new My_Node_Implementation(child)
                    return x
                }
            )
        )
    }

    get location(): { line: number; column: number } {
        const sourceFile = this.tsNode.getSourceFile()
        const pos = this.tsNode.getStart()
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
