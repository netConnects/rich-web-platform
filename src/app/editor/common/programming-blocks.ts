

export class Branch {
  name: string = 'Simple';
  type = '';
  children: Branch[] = [];
  parent!: Branch;
  isMarkerNode = false;
  attributes: Map<string, string> = new Map();
  parserDebug = new ParserDebug();
  constructor(name: string) {
    this.name = name;
  }

  getAttributes(): Map<string, string> {
    return this.attributes;
  }

  getType(): string {
    return this.type;
  }
}
export const triggerType = [
  // example from java world
  'package', 'import', 'interface', 'class', 'enum', 'statement'
];
export enum NodeType {
  node = 'node', none = 'none', interface = 'interface', class = 'class', enum = 'enum',
  method = 'method', property = 'property', variable = 'variable', execution = 'execution',
  blockComment = 'Block Comment', lineComment = 'lineComment',
  import = 'import',
  unknown = 'unkown'

}
export class ParserDebug {
  content = '';
  capturedGroup: RegExpMatchArray | undefined;
  unknown = '';

}

export enum Attributes {
  name = `name`, extends = `extends`, preSpace = 'preSpace', implements = `implements`, static = `static`, abstract = 'abstract',
  typeOf = 'typeOf',
  public = 'public', private = 'private', package = 'package', volatile = 'volatile', type = 'type',
  lineComment = 'Line Comment',
  blockComment = 'Block Comment',
  class = 'class'
}
export class ClassNode extends Branch {
  constructor(name: string) {
    super(name);
  }
}
export class MethodNode extends Branch {
  constructor(name: string) {
    super(name);
  }
}
export class CommentNode extends Branch {
  constructor(name: string) {
    super(name);
  }
}
export class FileBranch extends Branch {
  constructor(name: string) {
    super(name);
    this.isMarkerNode = true;
  }
}
export class PackageNode extends Branch {
  constructor(name: string) {
    super(name);
  }
}
export class ImportNode extends Branch {
  constructor(name: string) {
    super(name);
  }
}
export abstract class VariableNode extends Branch {
  constructor(name: string) {
    super(name);
  }
}
export abstract class StatementNode extends Branch {
  constructor(name: string) {
    super(name);
  }
}
