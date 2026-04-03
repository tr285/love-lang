"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
let current = 0;
function parse(tokens) {
    current = 0;
    function walk() {
        let token = tokens[current];
        // 💖 FUNCTION
        if (token.type === "KEYWORD" && token.value === "promise") {
            current++;
            const name = tokens[current].value;
            current++;
            current++; // (
            current++; // )
            current++; // {
            const body = [];
            while (tokens[current] &&
                tokens[current].type !== "RBRACE") {
                const node = walk();
                if (node)
                    body.push(node);
            }
            current++; // }
            return {
                type: "Function",
                name,
                body
            };
        }
        // 💖 VARIABLE
        if (token.type === "KEYWORD" && token.value === "feel") {
            current++;
            const name = tokens[current].value;
            current++;
            current++; // =
            // 🔥 Expression
            if (tokens[current + 1]?.type === "OPERATOR") {
                const left = tokens[current].value;
                const operator = tokens[current + 1].value;
                const right = tokens[current + 2].value;
                current += 3;
                if (tokens[current]?.type === "SEMICOLON")
                    current++;
                return {
                    type: "Variable",
                    name,
                    value: {
                        type: "BinaryExpression",
                        left,
                        operator,
                        right
                    }
                };
            }
            const valueToken = tokens[current];
            current++;
            if (tokens[current]?.type === "SEMICOLON")
                current++;
            return {
                type: "Variable",
                name,
                value: valueToken.value
            };
        }
        // 💖 CALL
        if (token.type === "KEYWORD" && token.value === "say") {
            const name = token.value;
            current++;
            current++; // (
            const args = [];
            while (tokens[current] &&
                tokens[current].type !== "RPAREN") {
                args.push(tokens[current].value);
                current++;
            }
            current++; // )
            if (tokens[current]?.type === "SEMICOLON")
                current++;
            return {
                type: "Call",
                name,
                args
            };
        }
        // 💖 LOOP (forever)
        if (token.type === "KEYWORD" && token.value === "forever") {
            current++;
            current++; // (
            // handle expression condition
            let condition;
            if (tokens[current + 1]?.type === "OPERATOR") {
                condition = {
                    type: "BinaryExpression",
                    left: tokens[current].value,
                    operator: tokens[current + 1].value,
                    right: tokens[current + 2].value
                };
                current += 3;
            }
            else {
                condition = tokens[current].value;
                current++;
            }
            current++; // )
            current++; // {
            const body = [];
            while (tokens[current] &&
                tokens[current].type !== "RBRACE") {
                const node = walk();
                if (node)
                    body.push(node);
            }
            current++; // }
            return {
                type: "Loop",
                condition,
                body
            };
        }
        // 💖 IF (ifLove)
        if (token.type === "KEYWORD" && token.value === "ifLove") {
            current++;
            current++; // (
            let condition;
            if (tokens[current + 1]?.type === "OPERATOR") {
                condition = {
                    type: "BinaryExpression",
                    left: tokens[current].value,
                    operator: tokens[current + 1].value,
                    right: tokens[current + 2].value
                };
                current += 3;
            }
            else {
                condition = tokens[current].value;
                current++;
            }
            current++; // )
            current++; // {
            const body = [];
            while (tokens[current] &&
                tokens[current].type !== "RBRACE") {
                const node = walk();
                if (node)
                    body.push(node);
            }
            current++; // }
            return {
                type: "If",
                condition,
                body
            };
        }
        current++;
        return null;
    }
    const body = [];
    while (current < tokens.length) {
        const node = walk();
        if (node)
            body.push(node);
    }
    return {
        type: "Program",
        body
    };
}
