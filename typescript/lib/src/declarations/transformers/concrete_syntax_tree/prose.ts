
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/concrete_syntax_tree.js"
import type * as d_out from "pareto-fountain-pen/interface/data/prose"


export type Arguments = p_.Transformer<d_in.Arguments, d_out.Phrase>
export type As_Alias = p_.Transformer<d_in.As_Alias, d_out.Phrase>
export type Binding_Pattern = p_.Transformer<d_in.Binding_Pattern, d_out.Phrase>
export type Block = p_.Transformer<d_in.Block, d_out.Phrase>
export type Class_Body = p_.Transformer<d_in.Class_Body, d_out.Phrase>
export type Class = p_.Transformer<d_in.Class, d_out.Phrase>
export type Entity_Name = p_.Transformer<d_in.Entity_Name, d_out.Phrase>
export type Error_Recovery = p_.Transformer<d_in.Error_Recovery, d_out.Phrase>
export type Expression_With_Type_Arguments = p_.Transformer<d_in.Expression_With_Type_Arguments, d_out.Phrase>
export type Expression = p_.Transformer<d_in.Expression, d_out.Phrase>
export type Heritage = p_.Transformer<d_in.Heritage, d_out.Phrase>
export type Identifier = p_.Transformer<d_in.Identifier, d_out.Phrase>
export type Initializer = p_.Transformer<d_in.Initializer, d_out.Phrase>
export type JSDoc = p_.Transformer<d_in.JSDoc, d_out.Phrase>
export type Module_Body = p_.Transformer<d_in.Module_Body, d_out.Phrase>
export type Numeric_Literal = p_.Transformer<d_in.Numeric_Literal, d_out.Phrase>
export type Object_Type = p_.Transformer<d_in.Object_Type, d_out.Phrase>
export type Optional_Initializer = p_.Transformer<d_in.Optional_Initializer, d_out.Phrase>
export type Optional_Type = p_.Transformer<d_in.Optional_Type, d_out.Phrase>
export type Parameters = p_.Transformer<d_in.Parameters, d_out.Phrase>
export type Property_Name = p_.Transformer<d_in.Property_Name, d_out.Phrase>
export type Qualified_Name = p_.Transformer<d_in.Qualified_Name, d_out.Phrase>
export type Return_Type_Annotation = p_.Transformer<d_in.Return_Type_Annotation, d_out.Phrase>
export type Semi_Colon = p_.Transformer<d_in.Semi_Colon, d_out.Phrase>
export type Signature_Modifiers = p_.Transformer<d_in.Signature_Modifiers, d_out.Phrase>
export type Source_File = p_.Transformer<d_in.Source_File, d_out.Paragraph>
export type Statement_Modifiers = p_.Transformer<d_in.Statement_Modifiers, d_out.Phrase>
export type Statement = p_.Transformer<d_in.Statement, d_out.Phrase>
export type Statements = p_.Transformer<d_in.Statements, d_out.Paragraph>
export type String_Literal = p_.Transformer<d_in.String_Literal, d_out.Phrase>
export type Type_Arguments = p_.Transformer<d_in.Type_Arguments, d_out.Phrase>
export type Type_Parameters = p_.Transformer<d_in.Type_Parameters, d_out.Phrase>
export type Type_Predicate = p_.Transformer<d_in.Type_Predicate, d_out.Phrase>
export type Type = p_.Transformer<d_in.Type, d_out.Phrase>
export type Variable_Declaration_List = p_.Transformer<d_in.Variable_Declaration_List, d_out.Phrase>
export type Variable_Declaration = p_.Transformer<d_in.Variable_Declaration, d_out.Phrase>

