
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/concrete_syntax_tree.js"
import type * as s_out from "pareto-fountain-pen/interface/data/prose"


export type Arguments = p_.Transformer<s_in.Arguments, s_out.Phrase>
export type As_Alias = p_.Transformer<s_in.As_Alias, s_out.Phrase>
export type Binding_Pattern = p_.Transformer<s_in.Binding_Pattern, s_out.Phrase>
export type Block = p_.Transformer<s_in.Block, s_out.Phrase>
export type Class_Body = p_.Transformer<s_in.Class_Body, s_out.Phrase>
export type Class = p_.Transformer<s_in.Class, s_out.Phrase>
export type Entity_Name = p_.Transformer<s_in.Entity_Name, s_out.Phrase>
export type Error_Recovery = p_.Transformer<s_in.Error_Recovery, s_out.Phrase>
export type Expression_With_Type_Arguments = p_.Transformer<s_in.Expression_With_Type_Arguments, s_out.Phrase>
export type Expression = p_.Transformer<s_in.Expression, s_out.Phrase>
export type Heritage = p_.Transformer<s_in.Heritage, s_out.Phrase>
export type Identifier = p_.Transformer<s_in.Identifier, s_out.Phrase>
export type Initializer = p_.Transformer<s_in.Initializer, s_out.Phrase>
export type JSDoc = p_.Transformer<s_in.JSDoc, s_out.Phrase>
export type Module_Body = p_.Transformer<s_in.Module_Body, s_out.Phrase>
export type Numeric_Literal = p_.Transformer<s_in.Numeric_Literal, s_out.Phrase>
export type Object_Type = p_.Transformer<s_in.Object_Type, s_out.Phrase>
export type Optional_Initializer = p_.Transformer<s_in.Optional_Initializer, s_out.Phrase>
export type Optional_Type = p_.Transformer<s_in.Optional_Type, s_out.Phrase>
export type Parameters = p_.Transformer<s_in.Parameters, s_out.Phrase>
export type Property_Name = p_.Transformer<s_in.Property_Name, s_out.Phrase>
export type Qualified_Name = p_.Transformer<s_in.Qualified_Name, s_out.Phrase>
export type Return_Type_Annotation = p_.Transformer<s_in.Return_Type_Annotation, s_out.Phrase>
export type Semi_Colon = p_.Transformer<s_in.Semi_Colon, s_out.Phrase>
export type Signature_Modifiers = p_.Transformer<s_in.Signature_Modifiers, s_out.Phrase>
export type Source_File = p_.Transformer<s_in.Source_File, s_out.Paragraph>
export type Statement_Modifiers = p_.Transformer<s_in.Statement_Modifiers, s_out.Phrase>
export type Statement = p_.Transformer<s_in.Statement, s_out.Phrase>
export type Statements = p_.Transformer<s_in.Statements, s_out.Paragraph>
export type String_Literal = p_.Transformer<s_in.String_Literal, s_out.Phrase>
export type Type_Arguments = p_.Transformer<s_in.Type_Arguments, s_out.Phrase>
export type Type_Parameters = p_.Transformer<s_in.Type_Parameters, s_out.Phrase>
export type Type_Predicate = p_.Transformer<s_in.Type_Predicate, s_out.Phrase>
export type Type = p_.Transformer<s_in.Type, s_out.Phrase>
export type Variable_Declaration_List = p_.Transformer<s_in.Variable_Declaration_List, s_out.Phrase>
export type Variable_Declaration = p_.Transformer<s_in.Variable_Declaration, s_out.Phrase>

