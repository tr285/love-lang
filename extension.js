const vscode = require("vscode");

function activate(context) {
  console.log("LoveLang Activated 💖");

  // 🔥 AUTOCOMPLETE (PRO)
  const provider = vscode.languages.registerCompletionItemProvider(
    "love",
    {
      provideCompletionItems(document, position) {
        const suggestions = [];

        // 💖 feel (variable)
        const feel = new vscode.CompletionItem(
          "feel",
          vscode.CompletionItemKind.Keyword
        );
        feel.detail = "Declare variable";
        feel.insertText = new vscode.SnippetString("feel ${1:name} = ${2:value};");
        suggestions.push(feel);

        // 💖 promise (function)
        const promise = new vscode.CompletionItem(
          "promise",
          vscode.CompletionItemKind.Function
        );
        promise.detail = "Define function";
        promise.insertText = new vscode.SnippetString(
          "promise ${1:main}() {\n\t$0\n}"
        );
        suggestions.push(promise);

        // 💖 say (print)
        const say = new vscode.CompletionItem(
          "say",
          vscode.CompletionItemKind.Function
        );
        say.detail = "Print output";
        say.insertText = new vscode.SnippetString("say(${1:value});");
        suggestions.push(say);

        // 💖 ifLove
        const ifLove = new vscode.CompletionItem(
          "ifLove",
          vscode.CompletionItemKind.Keyword
        );
        ifLove.detail = "Condition";
        ifLove.insertText = new vscode.SnippetString(
          "ifLove(${1:condition}) {\n\t$0\n}"
        );
        suggestions.push(ifLove);

        // 💖 forever loop
        const forever = new vscode.CompletionItem(
          "forever",
          vscode.CompletionItemKind.Keyword
        );
        forever.detail = "Loop";
        forever.insertText = new vscode.SnippetString(
          "forever(${1:condition}) {\n\t$0\n}"
        );
        suggestions.push(forever);

        return suggestions;
      }
    },
    " ", "(" // 🔥 trigger suggestions automatically
  );

  context.subscriptions.push(provider);

  // 💡 HOVER (Docs)
  const hoverProvider = vscode.languages.registerHoverProvider("love", {
    provideHover(document, position) {
      const word = document.getText(
        document.getWordRangeAtPosition(position)
      );

      if (word === "feel") {
        return new vscode.Hover("💖 `feel` → Declares a variable");
      }

      if (word === "promise") {
        return new vscode.Hover("💖 `promise` → Defines a function");
      }

      if (word === "say") {
        return new vscode.Hover("💖 `say()` → Prints output");
      }

      if (word === "forever") {
        return new vscode.Hover("💖 `forever()` → Loop until condition is false");
      }
    }
  });

  context.subscriptions.push(hoverProvider);

  // ❌ BASIC ERROR CHECK
  const diagnostics = vscode.languages.createDiagnosticCollection("love");

  function validate(document) {
    if (document.languageId !== "love") return;

    const text = document.getText();
    const errors = [];

    if (!text.includes("promise main")) {
      const range = new vscode.Range(0, 0, 0, 1);
      errors.push(
        new vscode.Diagnostic(
          range,
          "💔 Missing 'promise main()' entry point",
          vscode.DiagnosticSeverity.Error
        )
      );
    }

    diagnostics.set(document.uri, errors);
  }

  vscode.workspace.onDidOpenTextDocument(validate);
  vscode.workspace.onDidChangeTextDocument(e => validate(e.document));
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};