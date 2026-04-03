"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
function generate(ast) {
    let output = `
#include <stdio.h>

`;
    function walk(node) {
        switch (node.type) {
            case "Function":
                return generateFunction(node);
            default:
                return "";
        }
    }
    function generateFunction(node) {
        let code = `int ${node.name}() {\n`;
        node.body.forEach((child) => {
            code += generateStatement(child);
        });
        code += "return 0;\n}\n";
        return code;
    }
    function generateStatement(node) {
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
    function generateVariable(node) {
        return `char ${node.name}[] = "${node.value}";\n`;
    }
    function generateCall(node) {
        if (node.name === "say") {
            return `printf("%s\\n", ${node.args[0]});\n`;
        }
        return "";
    }
    function generateExpression(node) {
        return `${node.left} ${node.operator} ${node.right};\n`;
    }
    ast.body.forEach((node) => {
        output += walk(node);
    });
    return output;
}
