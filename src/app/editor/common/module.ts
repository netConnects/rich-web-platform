// import { FnWorld } from './fn-world';
// import * as fs from 'fs';
// import { ParserData, ParserModel } from './model';
// import { ComponentParser } from './parser';
// import * as vscode from 'vscode';
// import { Branch, FileBranch } from './programming-blocks';

// export class FileParser extends ComponentParser {
//   constructor(language: string, parserData: ParserData | undefined) {
//     super(language, parserData);
//   }
// }

// export class UnknownParser extends ComponentParser {

//   constructor(language: string, blockComment: ParserData) {
//     super(language, new ParserData());
//     this.name = 'Unknown';
//     this.matcherRegex = '/(.*)/smy';
//     this.attributeArray = ['content'];

//     try {
//       this.writerSubstitution = blockComment.writerSubstitution.replace('$1', 'not able to parse: Start')
//         + '\n$1\n' + blockComment.writerSubstitution.replace('$1', 'not able to parse: End');
//     } catch (e) {
//       throw Error('Block comment is not provided\n' + e);
//     }

//   }
// }

// export class LanguageParserProvider {

//   static parsers: Map<string, ParserModel> = new Map();
//   constructor() {
//     const ws = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0 ?
//       vscode.workspace.workspaceFolders[0].uri.fsPath : '';
//     const configPath = ws.toString() + ('/.vscode/o2n/parsers.json');
//     const content = fs.readFileSync(configPath, 'utf8');
//     const parsedValue = (JSON.parse(content));
//     parsedValue.nodeParsers.forEach((parser: ParserModel) => {
//       LanguageParserProvider.parsers.set(parser.language, parser);
//       const unknownParser = new UnknownParser(parser.language, parser.parsers.filter(p => p.name === 'Block Comment')[0]);
//       parser.parsers.push(unknownParser);
//     });
//   }

//   getParser(lang: string): ParserModel | undefined {
//     return LanguageParserProvider.parsers.get(lang);
//   }
// }

// export class LanguageProcessor {
//   fileParser: FileParser = new FileParser('', undefined);
//   fileNode: Branch = new FileBranch('File');

//   constructor(private name: string, private pModel: ParserModel) {
//     FnWorld.if(this.pModel.parsers,
//       () => this.pModel.parsers.forEach(parser =>
//         FnWorld.if(parser.name === 'File', () => this.fileParser = new FileParser(name, parser))));
//     FnWorld.if(this.fileParser.name !== 'File',
//       () => { throw new Error('File Parser not found for the language :' + this.name); });
//   }

//   readFile(fileName: string): FileBranch {
//     this.fileNode.name = fileName;
//     const content = fs.readFileSync(fileName, 'utf8');
//     this.fileParser.parseHandler(content, this.fileNode);
//     this.fileNode.name = fileName;
//     return this.fileNode;
//   }

//   writeFile(node: FileBranch): string {
//     return this.fileParser.writeHandle(node);
//   }
// }
