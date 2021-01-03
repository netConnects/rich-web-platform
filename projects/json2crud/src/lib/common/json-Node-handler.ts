import { ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { ArrayElementComponent } from '../array-element/array-element.component';
import { ObjectElementComponent } from '../object-element/object-element.component';
import { ValueElementComponent } from '../value-element/value-element.component';
import { GlobalConfig } from './global-config';
import { JsonNode } from './json-node';

export class JsonNodeHandler<T> {


  handleArray(key: string, jsonData: any[], config: any, globalConfig: GlobalConfig): void {
    jsonData.forEach(data => {
      this.handleValue(key, data, config && config[key] ? config[key] : config, globalConfig);
    });
  }
  handleObject(key: string, jsonData: {}, config: any, globalConfig: GlobalConfig): void {
    Object.keys(jsonData).forEach(data => {
      this.handleValue(data, jsonData[data], config && config[data] ? config[data] : config, globalConfig);
    });
  }
  constructor(private jsonNode: JsonNode<T>, private resolver: ComponentFactoryResolver, private entry: ViewContainerRef) {
  }

  handleNewNode<N extends JsonNode<N>>(parent: JsonNode<any>, node: JsonNode<N>, i: number): ComponentRef<N> {

    const factory: ComponentFactory<N> = this.resolver.resolveComponentFactory(node.type);
    const component = this.entry.createComponent(factory);
    const instance = component.instance;
    instance.index = i;
    instance.type = node.type;
    instance.parent = parent;
    instance.jsonData = node.jsonData;
    instance.key = node.key;
    instance.config = node.config;
    instance.globalConfig = node.globalConfig;
    return component;
  }
  clone(component: any): (cloner) => void {
    return cloner => {
      component.childrens.push(cloner);
      this.handleNewNode(component, cloner, component.childrens.length - 1);
    };
  }

  handleValue(key: string, jsonData: any, config: any, globalConfig: GlobalConfig): void {
    let childNode: JsonNode<any>;
    if (jsonData instanceof Array) {
      childNode = new JsonNode<ArrayElementComponent>();
      childNode.type = ArrayElementComponent;
      jsonData.forEach(el => {
        if (el instanceof Object) {
          //    this.jsonNode.childrenKeyType.set(...Object.keys(el));
        }
      });
      console.log(`this is an array we are iterating`);
    } else if (jsonData instanceof Object) {
      childNode = new JsonNode<ObjectElementComponent>();
      childNode.type = ObjectElementComponent;
      console.log(`this is an object we are looking through`);
    } else {
      childNode = new JsonNode<ValueElementComponent>();
      childNode.type = ValueElementComponent;
    }
    this.decorateChild(childNode, config, jsonData, key, globalConfig);
    this.jsonNode.addJsonNode(childNode);
  }

  private decorateChild<N extends JsonNode<N>>(childNode: JsonNode<N>, config: any, jsonData: any[], key: string,
    globalConfig: GlobalConfig): void {

    childNode.config = config;
    childNode.jsonData = jsonData;
    childNode.key = key;
    childNode.globalConfig = globalConfig;
  }
}
