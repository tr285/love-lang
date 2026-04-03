"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpret = interpret;
// 💖 Scope system (pro upgrade)
const scopeStack = [{}];
function getScope() {
    return scopeStack[scopeStack.length - 1];
}
function resolve(name) {
    if (typeof name !== "string")
        return name;
    for (let i = scopeStack.length - 1; i >= 0; i--) {
        if (scopeStack[i][name] !== undefined) {
            return scopeStack[i][name];
        }
    }
    return name;
}
function interpret(ast) {
    ast.body.forEach(node => evaluate(node));
}
function evaluate(node) {
    switch (node.type) {
        case "Function":
            return evalFunction(node);
        case "Variable":
            return evalVariable(node);
        case "Call":
            return evalCall(node);
        case "BinaryExpression":
            return evalExpression(node);
        case "If":
            return evalIf(node);
        case "Loop":
            return evalLoop(node);
    }
}
// 💖 Function
function evalFunction(node) {
    if (node.name === "main") {
        scopeStack.push({});
        node.body.forEach(child => evaluate(child));
        scopeStack.pop();
    }
}
// 💖 Variable
function evalVariable(node) {
    const scope = getScope();
    if (typeof node.value === "object") {
        scope[node.name] = evalExpression(node.value);
    }
    else {
        scope[node.name] = node.value;
    }
}
// 💖 Call
function evalCall(node) {
    if (node.name === "say") {
        const values = node.args.map(arg => resolve(arg));
        console.log(...values);
    }
}
// 💖 Loop
function evalLoop(node) {
    while (true) {
        const condition = evaluateCondition(node.condition);
        if (!condition)
            break;
        node.body.forEach((child) => evaluate(child));
    }
}
// 💖 Expression
function evalExpression(node) {
    const left = resolve(node.left);
    const right = resolve(node.right);
    switch (node.operator) {
        case "+":
            return String(left) + String(right);
        case "-":
            return Number(left) - Number(right);
        case "*":
            return Number(left) * Number(right);
        case "/":
            return Number(left) / Number(right);
        case "==":
            return left == right;
        case ">":
            return left > right;
        case "<":
            return left < right;
    }
}
// 💖 Condition evaluator
function evaluateCondition(condition) {
    if (typeof condition === "object") {
        return evalExpression(condition);
    }
    return resolve(condition);
}
// 💖 If
function evalIf(node) {
    const condition = evaluateCondition(node.condition);
    if (condition) {
        node.body.forEach((child) => evaluate(child));
    }
}
