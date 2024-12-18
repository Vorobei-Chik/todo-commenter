import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let addTodoCommand = vscode.commands.registerCommand('extension.addTodo', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const languageId = document.languageId;
            const selection = editor.selection;

            let commentSyntax = '';
            if (languageId === 'javascript' || languageId === 'typescript' || languageId === 'c' || languageId === 'cpp' || languageId === 'java') {
                commentSyntax = '// TODO: ';
            } else if (languageId === 'python' || languageId === 'ruby') {
                commentSyntax = '# TODO: ';
            } else if (languageId === 'html' || languageId === 'xml') {
                commentSyntax = '<!-- TODO: ';
            } else if (languageId === 'shellscript' || languageId === 'bash') {
                commentSyntax = '# TODO: ';
            } else {
                commentSyntax = '// TODO: ';
            }

            const currentDate = new Date().toISOString().split('T')[0];
            const todoComment = `${commentSyntax}${currentDate}`;

            editor.edit(editBuilder => {
                editBuilder.insert(selection.active, todoComment);
            });
        }
    });

    context.subscriptions.push(addTodoCommand);
}

export function deactivate() {}