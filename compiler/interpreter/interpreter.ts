import {
  ProgramNode,
  FunctionNode,
  VariableNode,
  CallNode,
  ASTNode,
  BinaryExpression
} from "../AST/ast";

// 💖 Global scope (simple runtime memory)
const scope: Record<string, any> = {};

// 🚀 Entry point
export function interpret(ast: ProgramNode) {
  ast.body.forEach(node => evaluate(node));
}

// 🧠 Core evaluator
function evaluate(node: ASTNode): any {
  switch (node.type) {
    case "Function":
      return evalFunction(node);

    case "Variable":
      return evalVariable(node);

    case "Call":
      return evalCall(node);

    case "Loop":
      return evalLoop(node);

    case "If":
      return evalIf(node);

    case "BinaryExpression":
      return evalExpression(node);
  }
}

// 💖 Function (entry: main)
function evalFunction(node: FunctionNode) {
  if (node.name === "main") {
    node.body.forEach(child => evaluate(child));
  }
}

// 💖 Variable assignment
function evalVariable(node: VariableNode) {
  if (typeof node.value === "object") {
    scope[node.name] = evalExpression(node.value);
  } else {
    scope[node.name] = node.value;
  }
}

// 💖 Function call (say)
function evalCall(node: CallNode) {
  if (node.name === "say") {
    const values = node.args
      // 🔥 REMOVE ANY BAD TOKENS (comma safety)
      .filter(arg => arg !== "," && arg !== "")
      .map(arg => {
        // resolve variable OR return literal
        return scope[arg] !== undefined ? scope[arg] : arg;
      });

    console.log(...values);
  }
}

// 💖 Loop (forever)
function evalLoop(node: any) {
  while (evaluateCondition(node.condition)) {
    node.body.forEach((child: ASTNode) => evaluate(child));
  }
}

// 💖 If condition
function evalIf(node: any) {
  if (evaluateCondition(node.condition)) {
    node.body.forEach((child: ASTNode) => evaluate(child));
  }
}

// 💖 Evaluate condition
function evaluateCondition(condition: any): boolean {
  if (typeof condition === "object") {
    return evalExpression(condition);
  }

  return Boolean(scope[condition] ?? condition);
}

// 💖 Expression evaluator
function evalExpression(expr: BinaryExpression): any {
  const left = resolve(expr.left);
  const right = resolve(expr.right);

  switch (expr.operator) {
    case "+":
      return String(left) + String(right);

    case "-":
      return Number(left) - Number(right);

    case "*":
      return Number(left) * Number(right);

    case "/":
      return Number(left) / Number(right);

    case ">":
      return Number(left) > Number(right);

    case "<":
      return Number(left) < Number(right);

    case "==":
      return left == right;

    default:
      console.warn("Unknown operator:", expr.operator);
      return null;
  }
}

// 💖 Resolve variables safely
function resolve(value: any): any {
  if (scope[value] !== undefined) {
    return scope[value];
  }
  return value;
}