import {
  ProgramNode,
  FunctionNode,
  VariableNode,
  CallNode,
  ASTNode
} from "../AST/ast";

export function generate(ast: ProgramNode): string {
  let output = `
#include <stdio.h>

`;

  function walk(node: ASTNode): string {
    switch (node.type) {
      case "Function":
        return generateFunction(node);
      default:
        return "";
    }
  }

  function generateFunction(node: FunctionNode): string {
    let code = `int ${node.name}() {\n`;

    node.body.forEach((child) => {
      code += generateStatement(child);
    });

    code += "return 0;\n}\n";
    return code;
  }

  function generateStatement(node: ASTNode): string {
    switch (node.type) {
      case "Variable":
        return generateVariable(node);
      case "Call":
        return generateCall(node);
      case "BinaryExpression":
        return generateExpression(node);
      default:
        return "";
    }
  }

  function generateVariable(node: VariableNode): string {
    return `char ${node.name}[] = "${node.value}";\n`;
  }

  function generateCall(node: CallNode): string {
    if (node.name === "say") {
      return `printf("%s\\n", ${node.args[0]});\n`;
    }
    return "";
  }

  function generateExpression(node: any): string {
    return `${node.left} ${node.operator} ${node.right};\n`;
  }

  ast.body.forEach((node) => {
    output += walk(node);
  });

  return output;
}