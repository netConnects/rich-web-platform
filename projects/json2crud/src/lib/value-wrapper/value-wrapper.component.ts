import { JsonNode } from './../common/json-node';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

@Component({
  selector: 'lib-value-wrapper',
  templateUrl: './value-wrapper.component.html',
  styleUrls: ['./value-wrapper.component.css']
})
export class ValueWrapperComponent extends JsonNode<ValueWrapperComponent> implements OnInit {

  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }

  ngOnInit(): void {

  }

}
