import { Type, ViewContainerRef, ComponentRef } from '@angular/core';
import { GlobalConfig, JsonNodeConfig, NodeConfig } from './global-config';
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
  componentRefChildrens: ComponentRef<any>[] = [];
  label = '';
  expandMe = { value: true };
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
  show(config: NodeConfig): boolean {
    return !config || !config.hidden;
  }
  showLabel(config: NodeConfig): boolean {
    return (!config || config.label !== '');
  }
  findKey(): void {
    this.childrens.forEach(node => {
      if (node.config && node.config.key) {
        this.title = this.jsonData[node.key];
      }
    });
  }

  setLabel(): void {
    this.label = this.key;
    if (this.key && !this.key.includes(' ')) {
      this.label = this.label.replace(/([A-Z])/g, ' $1');
      this.label = this.label.replace(/^(.)/g, x => x[0].toUpperCase());
    }
  }
  reset(force = false): void {
    if (this.globalConfig.isEditing || force) {

      this.componentRefChildrens.forEach(ref => {
        ref.destroy();
      });
      delete this.childrens;
      delete this.componentRefChildrens;
      this.componentRefChildrens = [];
      this.childrens = [];
      this.parseData();
    }
  }

  getChildren(): JsonNode<any>[] {
    return this.childrens;
  }
  parseData(): void {
    // override
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
