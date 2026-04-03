declare const __dirname: string;
import * as vscode from "vscode";        // ✅ correct
import { exec } from "child_process";    // ✅ correct
import * as path from "path";          // ✅ correct

export function activate(context: vscode.ExtensionContext) {
  console.log("LoveLang Activated 💖");

  const runCommand = vscode.commands.registerCommand("love.run", () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage("No file open 💔");
      return;
    }

    const filePath = editor.document.fileName;

    // 🔥 path to your CLI
    const cliPath = path.join(__dirname, "../../cli/lovec.ts");

   exec(
  `npx ts-node "${cliPath}" "${filePath}"`,
  (err: any, stdout: string, stderr: string)  => {
      const output = vscode.window.createOutputChannel("LoveLang 💖");
      output.clear();
      output.show(true);

      if (err) {
        output.appendLine("❌ Error:");
        output.appendLine(stderr);
        return;
      }

      output.appendLine(stdout || "✅ Execution finished");
    });
  });

  context.subscriptions.push(runCommand);
}

export function deactivate() {}