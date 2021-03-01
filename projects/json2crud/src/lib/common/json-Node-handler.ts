import { ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { ArrayElementComponent } from '../array-element/array-element.component';
import { ObjectElementComponent } from '../object-element/object-element.component';
import { ValueElementComponent } from '../value-element/value-element.component';
import { GlobalConfig, JsonNodeConfig, NodeConfig } from './global-config';
import { JsonNode } from './json-node';

export class JsonNodeHandler<T> {


  handleArray(key: string, jsonData: any[], config: any, globalConfig: GlobalConfig): void {
    jsonData.forEach((data, index) => {
      if (typeof data === 'string' || typeof data === 'number') {
        key = index + '';
      }
      this.handleValue(key, jsonData, data, config[key] || config, globalConfig);
    });
  }

  handleObject(key: string, jsonData: {}, config: any, globalConfig: GlobalConfig): void {
    Object.keys(jsonData).forEach(data => {
      this.handleValue(data, jsonData, jsonData[data], config[data] || config, globalConfig);
    });
  }

  constructor(private jsonNode: JsonNode<T>, private resolver: ComponentFactoryResolver, private entry: ViewContainerRef) {
  }

  handleNewNode<N extends JsonNode<N>>(parent: JsonNode<any>, node: JsonNode<any>, i: number, clone: boolean = false): ComponentRef<N> {


    if (parent.type === ArrayElementComponent) {
      let map = ArrayElementComponent.KEY_MAP.get(parent.key);
      if (!map) {
        map = {};
        ArrayElementComponent.KEY_MAP.set(parent.key, map);
      }
      this.addValuesToMap<N>(node, map);
    }


    const factory: ComponentFactory<N> = this.resolver.resolveComponentFactory(node.type);
    const component = this.entry.createComponent(factory);
    const instance = component.instance;
    instance.index = i;
    instance.type = node.type;
    instance.parent = parent;
    if (clone) {
      instance.jsonData = JSON.parse(JSON.stringify(node.jsonData));
      parent.jsonData.push(instance.jsonData);
    } else {
      instance.jsonData = node.jsonData;
    }
    instance.parentData = node.parentData;
    instance.key = node.key;
    instance.childrens.push(...node.childrens);
    instance.config = node.config;
    instance.globalConfig = node.globalConfig;
    return component;

  }

  private addValuesToMap<N extends JsonNode<N>>(node: JsonNode<any>, map: {}): void {
    if (node.type === ObjectElementComponent) {
      Object.keys(node.jsonData).forEach(key => {
        map[key] = node.jsonData[key];
      });
    }
  }

  clone<C extends JsonNode<T>>(component: C): (cloner) => void {
    return cloner => {
      const clonedIndex = cloner.index;
      component.childrens.splice(cloner.index, 0, cloner);
      component.JSON_DATA.splice(cloner.index, 0, { ...cloner.JSON_DATA });
      component.reset();
      setTimeout(() => {
        component.childrens[clonedIndex].expandMe.value = false;
        setTimeout(() => {
          component.childrens[clonedIndex].expandMe.value = true;

        }, 400);
      }, 200);
      //this.handleNewNode(component, cloner, cloner.index + 1, true);
    };
  }

  handleValue<M extends JsonNode<M>>(key: string, parentData: any, jsonData: any, config: JsonNodeConfig,
    globalConfig: GlobalConfig): JsonNode<M> {
    let childNode: JsonNode<any>;
    if (jsonData instanceof Array) {
      childNode = new JsonNode<ArrayElementComponent>();
      childNode.type = ArrayElementComponent;
    } else if (jsonData instanceof Object) {
      childNode = new JsonNode<ObjectElementComponent>();
      childNode.type = ObjectElementComponent;
    } else {
      childNode = new JsonNode<ValueElementComponent>();
      childNode.type = ValueElementComponent;

    }
    childNode.parentData = parentData;
    childNode.config = config;
    childNode.jsonData = jsonData;
    childNode.key = key;
    childNode.globalConfig = globalConfig;
    this.jsonNode.addJsonNode(childNode);
    return childNode;
  }


}
