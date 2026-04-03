# 💖 LoveLang

A custom programming language built from scratch.

## Features
- Custom syntax (feel, say, forever, ifLove)
- Lexer + Parser + AST
- Interpreter
- VS Code Extension
- Debug system

## Example

```love
promise main() {
  feel count = 3;

  forever(count > 0) {
    say("Count:", count);
    count = count - 1;
  }
}
