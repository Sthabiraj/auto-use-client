import * as vscode from "vscode";

const BUILT_IN_HOOKS = [
  "useState",
  "useEffect",
  "useContext",
  "useReducer",
  "useCallback",
  "useMemo",
  "useRef",
  "useImperativeHandle",
  "useLayoutEffect",
  "useDebugValue",
  "useDeferredValue",
  "useTransition",
  "useId",
];

export function activate(context: vscode.ExtensionContext) {
  console.log("Auto Use Client extension is now active");

  let disposable = vscode.workspace.onDidSaveTextDocument(
    (document: vscode.TextDocument) => {
      if (
        [
          "typescript",
          "typescriptreact",
          "javascript",
          "javascriptreact",
        ].includes(document.languageId)
      ) {
        addUseClientIfNeeded(document);
      }
    }
  );

  context.subscriptions.push(disposable);

  context.subscriptions.push(
    vscode.commands.registerCommand("auto-use-client.addDirective", () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        addUseClientIfNeeded(editor.document);
      }
    })
  );
}

function addUseClientIfNeeded(document: vscode.TextDocument) {
  const text = document.getText();
  if (shouldAddUseClient(text)) {
    const edit = new vscode.WorkspaceEdit();
    edit.insert(document.uri, new vscode.Position(0, 0), "'use client';\n\n");
    vscode.workspace.applyEdit(edit).then(() => {
      document.save();
    });
  }
}

function shouldAddUseClient(text: string): boolean {
  if (text.includes("use client")) {
    return false;
  }

  // Check for built-in hooks
  if (BUILT_IN_HOOKS.some((hook) => text.includes(hook))) {
    return true;
  }

  // Check for custom hooks (starting with 'use')
  const customHookRegex = /\buse[A-Z]\w+/g;
  if (customHookRegex.test(text)) {
    return true;
  }

  // Check for potential third-party hooks (any function call starting with 'use')
  const thirdPartyHookRegex = /\buse\w+\(/g;
  if (thirdPartyHookRegex.test(text)) {
    return true;
  }

  return false;
}

export function deactivate() {}
