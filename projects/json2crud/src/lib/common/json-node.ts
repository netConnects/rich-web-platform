import { Type, ViewContainerRef, ComponentRef } from '@angular/core';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { GlobalConfig, JsonNodeConfig, NodeConfig } from './global-config';
import { JsonNodeHandler } from './json-Node-handler';

export class JsonNode<T> {
  entry: ViewContainerRef;
  parent: JsonNode<any>;
  childrenKeyType: {};
  visible = true;
  key = '';
  removed = false;
  JSON_DATA: any;
  globalConfig: GlobalConfig;
  parentData: any;
  componentRefChildrens: ComponentRef<any>[] = [];
  label = '';
  expandMe = { value: true };
  srchText: string;
  set searchText(str: string) {
    this.srchText = str;
    if (this.srchText) {
      const obj = typeof this.JSON_DATA === 'string' ? this.JSON_DATA : JSON.stringify(this.JSON_DATA);
      if (this.key.includes(this.srchText) || this.label.includes(this.srchText) || obj.toString().includes(this.srchText)) {
        this.visible = true;
      } else {
        this.visible = false;
      }
      this.childrens.forEach(child => child.searchText = this.searchText);
    } else {
      this.visible = true;
    }
  }
  get searchText(): string {
    return this.srchText;
  }
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
    return (!config || config.label !== '') && isNaN(Number.parseInt(this.key, 10));
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
    if (this.key && typeof this.key === 'string' && !this.key.includes(' ')) {
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
