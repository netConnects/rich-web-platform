// import * as fs from 'fs';
// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';
// import { LanguageParserProvider, LanguageProcessor } from './module';


// // this method is called when your extension is activated
// // your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

//   // Use the console to output diagnostic information (console.log) and errors (console.error)
//   // This line of code will only be executed once when your extension is activated
//   console.log('"java2typescript" is now active!');
//   const languageParserProvider: LanguageParserProvider = new LanguageParserProvider();
//   // The command has been defined in the package.json file
//   // Now provide the implementation of the command with registerCommand
//   // The commandId parameter must match the command field in package.json
//   const disposable = vscode.commands.registerCommand('extension.Java2Typescript', (file, allFiles) => {
//     // The code you place here will be executed every time your command is executed
//     const avail = ['Java', 'Typescript'];

//     showQuickPick('Select the source format :', avail).then(src => {
//       const remain = avail.filter(lang => lang !== src);
//       showQuickPick('Select the destination format:', remain).then(dest => {

//         allFiles.forEach((fileName: any) => {
//           //  processFile(fileName.fsPath);
//           // let jFileProccesor: JavaFileProcessor = new JavaFileProcessor(fileName.fsPath);

//           const pModelSrc = languageParserProvider.getParser(src + '');
//           const pModelDest = languageParserProvider.getParser(src + '');
//           if (pModelSrc && pModelDest) {
//             const srcLanguageParser = new LanguageProcessor(src + '', pModelSrc);
//             const destLanguageParser = new LanguageProcessor(dest + '', pModelDest);

//             const node = srcLanguageParser.readFile(fileName.fsPath);
//             const length = fileName.length;
//             const newName = fileName.fsPath.substring(0, length - 4) + 'ts';
//             node.name = newName;
//             const outputFile = destLanguageParser.writeFile(node);
//             fs.writeFile(newName, outputFile, {}, () => { });
//           }


//         });
//       });
//     });
//     vscode.window.showInformationMessage('Ts files were generated');
//   });
//   context.subscriptions.push(disposable);
// }
// /**
//  * Shows an input box using window.showInputBox().
//  */
// export async function showQuickPick(message: string, list: string[]) {
//   let i = 0;
//   return vscode.window.showQuickPick(list, {
//     placeHolder: message,
//     onDidSelectItem: item => vscode.window.showInformationMessage(`Focus ${++i}: ${item}`)
//   });

// }




// // this method is called when your extension is deactivated
// export function deactivate() { }

