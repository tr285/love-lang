import { Token } from "../lexer/tokenizer";
import {
  ASTNode,
  ProgramNode,
  BinaryExpression
} from "../AST/ast";

let current = 0;

export function parse(tokens: Token[]): ProgramNode {
  current = 0;

  function walk(): ASTNode | null {
    let token = tokens[current];

    // 💖 FUNCTION
    if (token.type === "KEYWORD" && token.value === "promise") {
      current++;
      const name = tokens[current].value;
      current++;

      current++; // (
      current++; // )

      current++; // {

      const body: ASTNode[] = [];

      while (
        tokens[current] &&
        tokens[current].type !== "RBRACE"
      ) {
        const node = walk();
        if (node) body.push(node);
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

      // 🔥 Binary Expression
      if (tokens[current + 1]?.type === "OPERATOR") {
        const expr: BinaryExpression = {
          type: "BinaryExpression",
          left: tokens[current].value,
          operator: tokens[current + 1].value,
          right: tokens[current + 2].value
        };

        current += 3;

        if (tokens[current]?.type === "SEMICOLON") current++;

        return {
          type: "Variable",
          name,
          value: expr
        };
      }

      const valueToken = tokens[current];
      current++;

      if (tokens[current]?.type === "SEMICOLON") current++;

      return {
        type: "Variable",
        name,
        value: valueToken.value
      };
    }

    // 💖 CALL (say)
    if (token.type === "KEYWORD" && token.value === "say") {
      current++;

      current++; // (

      const args: string[] = [];

      while (
        tokens[current] &&
        tokens[current].type !== "RPAREN"
      ) {
        const t = tokens[current];

        // 🔥 FINAL FIX: remove commas completely
        if (
          t.type !== "COMMA" &&
          t.value !== "," &&
          t.type !== "SEMICOLON"
        ) {
          args.push(t.value);
        }

        current++;
      }

      current++; // )

      if (tokens[current]?.type === "SEMICOLON") current++;

      return {
        type: "Call",
        name: "say",
        args
      };
    }

    // 💖 LOOP (forever)
    if (token.type === "KEYWORD" && token.value === "forever") {
      current++;

      current++; // (

      const condition: BinaryExpression = {
        type: "BinaryExpression",
        left: tokens[current].value,
        operator: tokens[current + 1].value,
        right: tokens[current + 2].value
      };

      current += 3;

      current++; // )
      current++; // {

      const body: ASTNode[] = [];

      while (
        tokens[current] &&
        tokens[current].type !== "RBRACE"
      ) {
        const node = walk();
        if (node) body.push(node);
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

      const condition: BinaryExpression = {
        type: "BinaryExpression",
        left: tokens[current].value,
        operator: tokens[current + 1].value,
        right: tokens[current + 2].value
      };

      current += 3;

      current++; // )
      current++; // {

      const body: ASTNode[] = [];

      while (
        tokens[current] &&
        tokens[current].type !== "RBRACE"
      ) {
        const node = walk();
        if (node) body.push(node);
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

  const body: ASTNode[] = [];

  while (current < tokens.length) {
    const node = walk();
    if (node) body.push(node);
  }

  return {
    type: "Program",
    body
  };
}