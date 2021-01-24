import { Type, ViewContainerRef } from '@angular/core';
import { GlobalConfig, JsonNodeConfig } from './global-config';
import { JsonNodeHandler } from './json-Node-handler';

export class JsonNode<T> {
  entry: ViewContainerRef;
  parent: JsonNode<any>;
  childrenKeyType: {};
  key = '';
  removed = false;
  JSON_DATA: any;
  globalConfig: GlobalConfig;
  parentData: any;

  get jsonData(): any {
    return this.JSON_DATA;
  }
  set jsonData(data: any) {
    this.JSON_DATA = data;
    if (this.parent) {

      this.parent.findKey();
    }
  }

  config: JsonNodeConfig;
  title = '';
  type: Type<T>;
  childrens: JsonNode<any>[] = [];

  handler: JsonNodeHandler<T>;
  classes: Map<string, string> = new Map();
  index: number;
  show(config: JsonNodeConfig): boolean {
    return !config || !config.hidden;
  }
  showLabel(config: JsonNodeConfig): boolean {
    return (!config || config.label !== '');
  }
  findKey(): void {
    this.childrens.forEach(node => {
      if (node.config && node.config.key) {
        this.title = this.jsonData[node.key];
      }
    });
  }

  getChildren(): JsonNode<any>[] {
    return this.childrens;
  }

  addJsonNode<N extends JsonNode<N>>(node: JsonNode<N>): void {
    if (node.config && node.config.key) {
      this.title = this.jsonData[node.key];
    }
    this.globalConfig = node.globalConfig;
    this.childrens.push(node);

  }
  removeThis(node: JsonNode<any>): void {
    this.jsonData.splice(node.index, 1);
  }
}
