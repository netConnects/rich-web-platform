import { PropertyTester } from './../common/global-config';
import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonNode } from '../common/json-node';
import { JsonNodeHandler } from '../common/json-Node-handler';

@Component({
  selector: 'lib-object-element',
  templateUrl: './object-element.component.html',
  styleUrls: ['./object-element.component.css']
})
export class ObjectElementComponent extends JsonNode<ObjectElementComponent> implements OnInit {
  @Output() cloner: EventEmitter<ObjectElementComponent> = new EventEmitter();
  @ViewChild('objectContainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  handler: JsonNodeHandler<ObjectElementComponent> = new JsonNodeHandler(this, this.resolver, this.entry);
  tester: PropertyTester = new PropertyTester();
  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }

  clone(): void {
    this.cloner.emit(this);
  }

  remove(): void {
    this.removed = true;
  }

  ngOnInit(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    this.handler.handleObject(this.key, this.jsonData,
      this.config && this.config[this.key] ? this.config[this.key] : this.config, this.globalConfig);

    if (!this.title) {
      Object.keys(this.config).forEach(element => {
        if (this.config[element].key) {
          this.handler.handleValue(element, '', this.config[element], this.globalConfig);
          this.title = element + '*';
        }
      });
    }

    this.handleNewNodes();

  }

  private handleNewNodes(): void {

    this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i) => {
      if (this.tester.isValidToAdd(node.config)) {
        const component = this.handler.handleNewNode<T>(this, node, i);
      }
    });

    this.cloner.subscribe(this.parent.handler.clone(this.parent));

  }

}
