'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "antshares-code-plugin" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposableOfQueryAnsBalance = vscode.commands.registerCommand('extension.queryAnsBalance', () => {
        // The code you place here will be executed every time your command is executed
        // TODO
        // Display a message box to the user
        vscode.window.showInformationMessage('TODO: Hello World!');
    });

    let disposableOfRunAntsharesContract = vscode.commands.registerCommand('extension.runAnsContract', () => {
        // The code you place here will be executed every time your command is executed
        // TODO
        // Display a message box to the user
        vscode.window.showInformationMessage('TODO: Hello World, runAnsContract!');
    });

    let disposableOfCompileCsharp = vscode.commands.registerCommand('extension.compile_avm', () => {
        // The code you place here will be executed every time your command is executed
        const cp = require('child_process')
        const process = require('process');
        const state = arguments[0];
        console.log(arguments, state); // TODO: cs filename
        const extensionPath = state.extensionPath;
        const workspacePath = vscode.workspace.rootPath;
        process.chdir(extensionPath);

        const docs = vscode.workspace.textDocuments;
        var csharpDocs = docs.filter((f) => f.languageId === "csharp")
        if(csharpDocs.length !== 1) {
            vscode.window.showInformationMessage('error: ' + "工作文件夹中只能唯一选择一个C#源文件");
            return;
        }
        const filename = csharpDocs[0].fileName;
        const outFilename = filename + ".avm";
        cp.exec(extensionPath + '/antshares/ascsc-testnet ' + filename + " " + outFilename, (err, stdout, stderr) => {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (err) {
                vscode.window.showInformationMessage('error: ' + err);
                return;
            }
            vscode.window.showInformationMessage('compile to avm successfully: ');
        });
    });

    context.subscriptions.push(disposableOfQueryAnsBalance);
    context.subscriptions.push(disposableOfCompileCsharp);
    context.subscriptions.push(disposableOfRunAntsharesContract);
}

// this method is called when your extension is deactivated
export function deactivate() {
}