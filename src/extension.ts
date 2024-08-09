import * as vscode from "vscode";

const REACT_HOOKS = [
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

const BROWSER_APIS = [
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "navigator",
  "fetch",
  "XMLHttpRequest",
  "addEventListener",
  "history",
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

  // Check for React hooks (built-in and custom)
  if (
    REACT_HOOKS.some((hook) => text.includes(hook)) ||
    /\buse[A-Z]\w+/.test(text)
  ) {
    return true;
  }

  // Check for browser APIs
  if (BROWSER_APIS.some((api) => text.includes(api))) {
    return true;
  }

  // Check for React Class components
  if (/class\s+\w+\s+extends\s+(React\.)?Component/.test(text)) {
    return true;
  }

  // Check for event handlers (common in client components)
  if (/on\w+={/.test(text)) {
    return true;
  }

  // Check for dynamic references (often used in client-side interactivity)
  if (/useRef\(|createRef\(/.test(text)) {
    return true;
  }

  return false;
}

export function deactivate() {}
