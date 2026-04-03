export type TokenType =
  | "KEYWORD"
  | "IDENTIFIER"
  | "STRING"
  | "NUMBER"
  | "OPERATOR"
  | "LPAREN"
  | "RPAREN"
  | "LBRACE"
  | "RBRACE"
  | "SEMICOLON"
  | "COMMA";

export type Token = {
  type: TokenType;
  value: string;
};

const KEYWORDS = [
  "feel",
  "promise",
  "say",
  "ifLove",
  "otherwise",
  "forever"
];

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    let char = input[i];

    // 🔹 skip spaces
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // 🔹 STRING
    if (char === '"') {
      let value = "";
      i++;

      while (i < input.length && input[i] !== '"') {
        value += input[i];
        i++;
      }

      i++;
      tokens.push({ type: "STRING", value });
      continue;
    }

    // 🔹 IDENTIFIER / KEYWORD
    if (/[a-zA-Z_]/.test(char)) {
      let value = "";

      while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
        value += input[i];
        i++;
      }

      tokens.push({
        type: KEYWORDS.includes(value) ? "KEYWORD" : "IDENTIFIER",
        value
      });

      continue;
    }

    // 🔹 NUMBER
    if (/[0-9]/.test(char)) {
      let value = "";

      while (i < input.length && /[0-9]/.test(input[i])) {
        value += input[i];
        i++;
      }

      tokens.push({ type: "NUMBER", value });
      continue;
    }

    // 🔥 MULTI OPERATOR
    if (char === "=" && input[i + 1] === "=") {
      tokens.push({ type: "OPERATOR", value: "==" });
      i += 2;
      continue;
    }

    // 🔹 SINGLE OPERATORS
    if ("+-*/><=".includes(char)) {
      tokens.push({ type: "OPERATOR", value: char });
      i++;
      continue;
    }

    // 🔹 SYMBOLS
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
      case ",":
        tokens.push({ type: "COMMA", value: "," }); // 💖 FIXED
        break;
      default:
        console.warn("Unknown character:", char);
    }

    i++;
  }

  return tokens;
}