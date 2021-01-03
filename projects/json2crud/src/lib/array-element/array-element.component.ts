import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonNode } from '../common/json-node';
import { JsonNodeHandler } from '../common/json-Node-handler';

@Component({
  selector: 'lib-array-element',
  templateUrl: './array-element.component.html',
  styleUrls: ['./array-element.component.scss']
})
export class ArrayElementComponent extends JsonNode<ArrayElementComponent> implements OnInit {
  @ViewChild('arrayContainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  @Output() cloner: EventEmitter<ArrayElementComponent> = new EventEmitter();
  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }
  handler: JsonNodeHandler<ArrayElementComponent> = new JsonNodeHandler(this, this.resolver, this.entry);
  ngOnInit(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    this.handler.handleArray(this.key, this.jsonData,
      this.config && this.config[this.key] ? this.config[this.key] : this.config, this.globalConfig);
    this.handleNewNodes();
  }

  private handleNewNodes(): void {
    this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i) => {
      const component = this.handler.handleNewNode<T>(this, node, i);

    });
    this.cloner.subscribe(this.handler.clone(this.parent));
  }

  activate(): void {
    //   this.entry.element.nativeElement.parent.class.add('activated');
  }
  deactivate(): void {
    //   this.entry.element.nativeElement.parent.class.remove('activated');
  }
  addInArray(): void {
    //  this.handler.handleNewNode<T>( i);
  }
}
