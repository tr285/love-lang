import * as fs from "fs";
import { tokenize } from "../compiler/lexer/tokenizer";
import { parse } from "../compiler/parser/parser";
import { interpret } from "../compiler/interpreter/interpreter";

const input = fs.readFileSync(process.argv[2], "utf-8");

const tokens = tokenize(input);
const ast = parse(tokens);

console.log("Running LoveLang 💖...\n");
console.log("TOKENS:", tokens);

interpret(ast);