"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = tokenize;
const KEYWORDS = ["feel", "promise", "give", "ifLove", "otherwise", "say"];
function tokenize(input) {
    const tokens = [];
    let i = 0;
    while (i < input.length) {
        let char = input[i];
        // Skip whitespace
        if (/\s/.test(char)) {
            i++;
            continue;
        }
        // Strings
        if (char === '"') {
            let value = "";
            i++;
            while (input[i] !== '"' && i < input.length) {
                value += input[i];
                i++;
            }
            i++; // skip closing "
            tokens.push({ type: "STRING", value });
            continue;
        }
        // Identifiers / Keywords
        if (/[a-zA-Z_]/.test(char)) {
            let value = "";
            while (/[a-zA-Z0-9_]/.test(input[i])) {
                value += input[i];
                i++;
            }
            if (KEYWORDS.includes(value)) {
                tokens.push({ type: "KEYWORD", value });
            }
            else {
                tokens.push({ type: "IDENTIFIER", value });
            }
            continue;
        }
        // Numbers
        if (/[0-9]/.test(char)) {
            let value = "";
            while (/[0-9]/.test(input[i])) {
                value += input[i];
                i++;
            }
            tokens.push({ type: "NUMBER", value });
            continue;
        }
        // Symbols
        switch (char) {
            case "(":
                tokens.push({ type: "LPAREN", value: "(" });
                break;
            case ")":
                tokens.push({ type: "RPAREN", value: ")" });
                break;
            case "{":
                tokens.push({ type: "LBRACE", value: "{" });
                break;
            case "}":
                tokens.push({ type: "RBRACE", value: "}" });
                break;
            case ";":
                tokens.push({ type: "SEMICOLON", value: ";" });
                break;
            case "=":
            case "+":
            case "-":
            case "*":
            case "/":
                tokens.push({ type: "OPERATOR", value: char });
                break;
            default:
                tokens.push({ type: "UNKNOWN", value: char });
        }
        i++;
    }
    return tokens;
}
