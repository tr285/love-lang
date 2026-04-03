export type ASTNode =
  | ProgramNode
  | LoopNode
  | FunctionNode
  | VariableNode
  | CallNode
  | BinaryExpression
  | IfNode;

export interface ProgramNode {
  type: "Program";
  body: ASTNode[];
}

export interface FunctionNode {
  type: "Function";
  name: string;
  body: ASTNode[];
}

export interface VariableNode {
  type: "Variable";
  name: string;
  value:  any;
}

export interface CallNode {
  type: "Call";
  name: string;
  args: string[];
}
export interface BinaryExpression {
  type: "BinaryExpression";
  left: string;
  operator: string;
  right: string;
}

export interface IfNode {
  type: "If";
  condition: any;
  body: ASTNode[];
}

export interface LoopNode {
  type: "Loop";
  condition: any;
  body: ASTNode[];
}