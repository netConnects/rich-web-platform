import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { config } from 'rxjs';
import { JsonNode } from '../common/json-node';
import { JsonNodeHandler } from '../common/json-Node-handler';

@Component({
  selector: 'lib-array-element',
  templateUrl: './array-element.component.html',
  styleUrls: ['./array-element.component.scss']
})
export class ArrayElementComponent extends JsonNode<ArrayElementComponent> implements OnInit {
  @ViewChild('arrayContainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }
  handler: JsonNodeHandler<ArrayElementComponent> = new JsonNodeHandler(this, this.resolver, this.entry);
  ngOnInit(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    this.handler.handleArray(this.key, this.jsonData,
      this.config && this.config[this.key] ? this.config[this.key] : this.config);
    this.handleNewNodes();
  }

  private handleNewNodes(): void {
    this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i) => {
      this.handler.handleNewNode<T>(node, i);
    });
  }
}
