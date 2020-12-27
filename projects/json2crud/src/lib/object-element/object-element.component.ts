import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonNode } from '../common/json-node';
import { JsonNodeHandler } from '../common/json-Node-handler';

@Component({
  selector: 'lib-object-element',
  templateUrl: './object-element.component.html',
  styleUrls: ['./object-element.component.css']
})
export class ObjectElementComponent extends JsonNode<ObjectElementComponent> implements OnInit {
  @ViewChild('objectContainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }

  handler: JsonNodeHandler<ObjectElementComponent> = new JsonNodeHandler(this, this.resolver, this.entry);
  ngOnInit(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    this.handler.handleObject(this.key, this.jsonData,
      this.config && this.config[this.key] ? this.config[this.key] : this.config);
    this.handleNewNodes();

  }

  private handleNewNodes(): void {
    this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i: number) => {
      const comp = this.handler.handleNewNode<T>(node, i);
    });
    if (!this.title &&   this.config.key) {

    }
  }

}
