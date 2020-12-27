import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ArrayElementComponent } from '../array-element/array-element.component';
import { ObjectElementComponent } from '../object-element/object-element.component';
import { JsonNode } from '../common/json-node';
import { JsonNodeHandler } from '../common/json-Node-handler';

@Component({
  selector: 'lib-value-element',
  templateUrl: './value-element.component.html',
  styleUrls: ['./value-element.component.css']
})
export class ValueElementComponent extends JsonNode<ValueElementComponent> implements OnInit {
  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }
  @ViewChild('valueContainer', { read: ViewContainerRef, static: true })
  entry: ViewContainerRef = undefined;
  handler: JsonNodeHandler<ValueElementComponent> = new JsonNodeHandler(this, this.resolver, this.entry);
  ngOnInit(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);


  }


}
