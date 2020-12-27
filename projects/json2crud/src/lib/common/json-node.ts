import { JsonNodeHandler } from './json-Node-handler';
import { Type, ViewContainerRef } from '@angular/core';

export abstract class JsonNode<T> {
  abstract entry: ViewContainerRef;
  key = '';
  JSON_DATA: any;
  get jsonData(): any {
    return this.JSON_DATA;
  }
  set jsonData(data: any) {
    this.JSON_DATA = data;
    this.findKey();
  }
  config: any;
  title = '';
  type: Type<T>;
  childrens: any[] = [];
  handler: JsonNodeHandler<T>;
  classes: Map<string, string> = new Map();
  index: number;

  findKey(): void {
    this.childrens.forEach(node => {
      if (node.config && node.config.key) {
        this.title = this.jsonData[node.key];
      }
    });
  }

  getChildren<N extends JsonNode<N>>(): N[] {
    return this.childrens;
  }

  addJsonNode<N extends JsonNode<N>>(node: { type: Type<N>, key: string, jsonData: any, config: any }): void {
    if (node.config && node.config.key) {
      this.title = this.jsonData[node.key];
    }
    this.childrens.push(node);
  }

}
