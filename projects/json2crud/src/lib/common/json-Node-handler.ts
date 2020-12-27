import { Component, ComponentFactory, ComponentFactoryResolver, Type, ViewContainerRef } from '@angular/core';
import { ArrayElementComponent } from '../array-element/array-element.component';
import { ObjectElementComponent } from '../object-element/object-element.component';
import { ValueElementComponent } from '../value-element/value-element.component';
import { JsonNode } from './json-node';

export class JsonNodeHandler<T> {
  handleArray(key: string, jsonData: any[], config: any): void {
    jsonData.forEach(data => {
      this.handleValue(key, data, config && config[key] ? config[key] : config);
    });
  }
  handleObject(key: string, jsonData: {}, config: any): void {
    Object.keys(jsonData).forEach(data => {
      this.handleValue(data, jsonData[data], config && config[data] ? config[data] : config);
    });
  }
  constructor(private jsonNode: JsonNode<T>, private resolver: ComponentFactoryResolver, private entry: ViewContainerRef) {

  }
  handleNewNode<N extends JsonNode<N>>(node: { type: Type<N>, key: string, jsonData: any, config: any }, i: number): N {
    const factory: ComponentFactory<N> = this.resolver.resolveComponentFactory(node.type);
    const component = this.entry.createComponent(factory);
    component.instance.index = i;
    component.instance.jsonData = node.jsonData;
    component.instance.key = node.key;
    component.instance.config = node.config;
    return component.instance;
  }

  handleValue<N extends JsonNode<N>>(key: string, jsonData: any, config: any): void {
    if (jsonData instanceof Array) {
      console.log(`this is an array we are iterating`);
      this.jsonNode.addJsonNode({ type: ArrayElementComponent, config, jsonData, key });
    } else if (jsonData instanceof Object) {
      console.log(`this is an object we are looking through`);
      this.jsonNode.addJsonNode({ type: ObjectElementComponent, config, jsonData, key });
    } else {
      this.jsonNode.addJsonNode({ type: ValueElementComponent, config, jsonData, key });
    }
  }
}
