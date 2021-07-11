import { FileBranch } from './programming-blocks';

export interface ParserModel {
  language: string;
  parsers: ParserData[];
  globalReplace: ReplacePair[];
  globalComponentParsers: ParserData[];
}

export interface ReplacePair {
  search: string;
  replace: string;
}

export class Message {
  version = '';
  command: Command = Command.none;
  newData = '';
  oopsData = {
    sourceLanguage: '',
    outputLanguage: '',
    inputText: ''
  };
  nodeParsers: ParserModel[] = [];
  fileBranch = '';
}

export enum Command {
  none,
  init,
  save,
  process
}

export class ParserData {
  /* Possible value in the childrens */
  public childNodeTypes: string[];
  /* name of the component */
  public name: string;
  /* Regex to match the component as whole with or without trailing value start marker */
  public matcherRegex: string;
  /* The attribute array is the captured group from the mater regex with zero indexed */
  public attributeArray: string[];
  /* The offset Regex is the value to match the subset of the matcher regex to passdown for children  */
  public offsetRegex: string;
  /* The  writer substitution is the output writer of the component which is a regex replacement
   which will be replaced with the attribute from the source */
  public writerSubstitution: string;
  /* the value start marker is syllable used by branch to start mark its territory
   Mostly { in {}, <tag> in <tag></tag>, ( in (), [ in [],  */
  public valueStartMarker: string;
  /* the value start marker is syllable used by branch to end mark its territory
  Mostly } in {}, </tag> in <tag></tag>, ) in (), ] in [],  */
  public valueEndMarker: string;
  /* the replacer is a set of find and replace action on the writer substitution */
  public replacer: ReplacePair[];
  /* Debug Flag*/
  public debug: boolean;
  constructor(parserData?: ParserData | undefined) {
    if (parserData) {
      this.childNodeTypes = parserData.childNodeTypes;
      this.attributeArray = parserData.attributeArray;
      this.name = parserData.name;
      this.offsetRegex = parserData.offsetRegex;
      this.matcherRegex = parserData.matcherRegex;
      this.writerSubstitution = parserData.writerSubstitution;
      this.replacer = parserData.replacer;
      this.valueEndMarker = parserData.valueEndMarker;
      this.valueStartMarker = parserData.valueStartMarker;
      this.debug = parserData.debug;
    } else {
      this.childNodeTypes = [];
      this.attributeArray = [];
      this.name = '';
      this.offsetRegex = '';
      this.matcherRegex = '';
      this.writerSubstitution = '';
      this.replacer = [];
      this.valueEndMarker = '';
      this.valueStartMarker = '';
      this.debug = false;
    }
  }
}
