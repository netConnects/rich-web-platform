// import { ParserData } from './model';
// import { LanguageParserProvider, UnknownParser } from './module';
// import { Attributes, Branch } from './programming-blocks';


// export class ComponentParser extends ParserData {
//   constructor(private language: string, parserData: ParserData | undefined) {
//     super(parserData);
//   }

//   public parser(node: Branch, groups: { [key: number]: string }): number {
//     for (let i = 0; i < this.attributeArray.length; i++) {
//       node.attributes.set(this.attributeArray[i], groups[i + 1]);
//     }
//     if (this.offsetRegex) {
//       const offsetString = groups[0].match(this.stringToRegex(this.offsetRegex));
//       if (offsetString) {
//         return offsetString[0].length;
//       }
//     }
//     return groups[0].length;
//   }

//   writer(node: Branch): string {
//     try {
//       const preSpace = node.attributes.get(Attributes.preSpace) || '';
//       return preSpace + this.writerSubstitution.replace(/\\n/g, '\n').replace(/\$([0-9])/g, (str, c1) => {
//         if (c1) {
//           const result = node.getAttributes().get(this.attributeArray[Number.parseInt(c1, 10) - 1]);
//           return result || '';
//         }
//         return str;
//       });
//     } catch {
//       throw new Error(`we got error while writing:  ${this.writerSubstitution}\
//              AttributeArray \n  : ${this.attributeArray}\
//             n\n Available Attributes:${node.attributes}`);
//     }
//   }

//   getChildTypes(): string[] {
//     return this.childNodeTypes;
//   }

//   stringToRegex = (str: string): RegExp => {
//     const searchString = str.match(/\/(.+)\/.*/);
//     // Main regex
//     const main = searchString ? searchString[1] : '';
//     const flags = str.match(/\/.+\/(.*)/);
//     // Regex options
//     const options = flags ? flags[1] : '';
//     // Compiled regex
//     return new RegExp(main, options);
//   }

//   parseHandler(content: string, node: Branch): number {
//     let readSoFar = '';
//     if (this.debug) {
//       node.parserDebug.content = content;
//     }
//     const parsers = LanguageParserProvider.parsers.get(this.language)?.parsers;
//     if (parsers) {
//       for (let i = 0; i < content.length; i++) {
//         const consumed = this.processChildrens(content, i, readSoFar.length, node);
//         if (consumed) {
//           readSoFar = content.substring(0, i + consumed);
//           i += consumed;
//         }
//       }
//       const unknown = content.substring(readSoFar.length + 1);
//       if (unknown.replace('\n', '').trim()) {
//         if (this.debug) {
//           node.parserDebug.unknown = unknown;
//         }
//         this.handleUnknown(parsers, unknown, node);
//       }
//     }
//     return content.length;
//   }

//   private handleUnknown(parsers: ParserData[], unknownValue: string, node: Branch)
//   //  simple
//   {
//     const unknownParser = new UnknownParser(this.language, parsers.filter(p => p.name === 'Block Comment')[0]);
//     const uknownNode: Branch = new Branch(unknownParser.name);
//     node.children.push(uknownNode);
//     uknownNode.parent = node;
//     unknownParser.parser(uknownNode, unknownValue.match(this.stringToRegex(unknownParser.matcherRegex)) || []);
//   }
//   private handleNestedBlock(content: string, startMarker: string, endMarker: string): string {
//     const startMarkerRegexp = new RegExp(`(${startMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|'|"|\${)`, 'ysm');
//     const endMarkerRegexp = new RegExp(`(${endMarker}|'|"|}|\`)`, 'ysm');
//     const parsers = LanguageParserProvider.parsers.get(this.language)?.parsers || [];
//     const commentsParsers = parsers.filter(p => p.name.includes('Comment'));
//     const block = content.match(startMarkerRegexp);
//     let open = 0;
//     for (let i = 0; i < content.length; i++) {
//       const substring = content.substr(i);
//       for (const parserData of commentsParsers) {
//         const parser = new ComponentParser(this.language, parserData);
//         const match = substring.match(this.stringToRegex(parser.matcherRegex));
//         if (match && match[0]) {
//           i += match[0].length;
//         }
//       }
//       const startMatch = startMarkerRegexp.test(substring) || startMarkerRegexp.test(substring);
//       const endMatch = substring.match(endMarkerRegexp);
//       if (startMatch) {
//         ++open;
//       } else if (endMatch) {
//         if (--open === 0) {
//           return content.substring(0, i + 1);
//         }
//       }
//     }

//     return '';
//   }

//   /*
//   * Process the child node
//   */
//   private processChildrens(content: string, startPoint: number, lastPoint: number, node: Branch): number {
//     let result = startPoint;
//     const parsers = LanguageParserProvider.parsers.get(this.language)?.parsers;
//     if (parsers) {
//       for (const childNodeType of this.getChildTypes()) {
//         try {
//           const parser = parsers.filter(p => p.name === childNodeType)[0];
//           if (!parser) {
//             throw new Error('Parser not defined for ' + childNodeType);
//           }
//           const childNodeParser = new ComponentParser(this.language, parser);
//           const substring = content.substr(startPoint);
//           const regexp = this.stringToRegex(parser.matcherRegex);
//           const regexCheck = substring.match(regexp) || substring.match(regexp);
//           if (regexCheck) {
//             const child: Branch = new Branch(childNodeType);
//             const offset = childNodeParser.parser(child, regexCheck);
//             const unknown = content.substr(lastPoint, startPoint - lastPoint);
//             const unknownValue = unknown.replace(/(.*\S)\s*?$.*/smy, '$1');
//             if (unknownValue.replace('\n', '').trim()) {
//               this.handleUnknown(parsers, unknownValue, node);
//             }
//             child.attributes.set(Attributes.preSpace, unknown.replace(/.*\S\s*?$(.*)/smy, '$1'));
//             let blockCode = regexCheck[0].substr(offset);
//             if (parser.valueStartMarker && regexCheck[0].endsWith(parser.valueStartMarker)) {
//               const blockCodeExteded = content.substr(startPoint + regexCheck[0].length - 1);
//               blockCode += this.handleNestedBlock(blockCodeExteded, parser.valueStartMarker, parser.valueEndMarker)
//                 .substr(parser.valueStartMarker.length);
//             }
//             if (parser.debug) {
//               child.parserDebug.capturedGroup = regexCheck;

//             }
//             result += offset;
//             result += this.handleNewComponent(blockCode, node, child, childNodeParser);
//             content = content.substr(result);
//           }
//         } catch (e) {
//           throw new Error('There is issue with regex for following element: ' + childNodeType + '\nUnderlying issue:\n' + e);
//         }
//       }
//     }
//     return result - startPoint;
//   }

//   writeHandle(node: Branch): string {
//     let result = this.writer(node);
//     const parserModule = LanguageParserProvider.parsers.get(this.language);
//     if (parserModule) {
//       const unknownParser = new UnknownParser(this.language, parserModule.parsers.filter(p => p.name === 'Block Comment')[0]);
//       node.children.forEach(child => {
//         if (child.name === unknownParser.name) {
//           result += unknownParser.writeHandle(child);
//         } else {
//           for (const childNodeType of this.getChildTypes()) {
//             try {
//               if (child.name === childNodeType) {
//                 const parser = parserModule.parsers.filter(p => p.name === childNodeType)[0];
//                 if (!parser) {
//                   throw new Error('Parser not defined for ' + childNodeType);
//                 }
//                 const childNodeParser = new ComponentParser(this.language, parser);
//                 result += childNodeParser.writeHandle(child);
//               }
//             } catch (e) {
//               throw new Error('There is issue with regex for following element: ' + childNodeType + '\nUnderlying issue:\n' + e);
//             }
//           }
//         }
//       });
//     }
//     return result;
//   }

//   handleNewComponent<CL extends Branch>(content: string, current: Branch, child: Branch, childNodeParser: ComponentParser): number {
//     current.children.push(child);
//     child.parent = current;
//     return childNodeParser.parseHandler(content, child);
//   }
// }
