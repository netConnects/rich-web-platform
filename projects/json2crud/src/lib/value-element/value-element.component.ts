import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonNode } from '../common/json-node';
import { JsonNodeHandler } from '../common/json-Node-handler';

@Component({
  selector: 'lib-value-element',
  templateUrl: './value-element.component.html',
  styleUrls: ['./value-element.component.scss']
})
export class ValueElementComponent extends JsonNode<ValueElementComponent> implements OnInit {
  constructor(private resolver: ComponentFactoryResolver, private el: ElementRef) {
    super();
  }
  @ViewChild('valueContainer', { read: ViewContainerRef, static: true })
  entry: ViewContainerRef = undefined;

  set formValue(str: any) {
    this.parentData[this.key] = str;
    this.jsonData = str;
  }
  get formValue(): any {
    return this.parentData[this.key];
  }

  handler: JsonNodeHandler<ValueElementComponent> = new JsonNodeHandler(this, this.resolver, this.entry);

  ngOnInit(): void {

    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    this.el.nativeElement.className = this.el.nativeElement.className + ' row';
    this.el.nativeElement.parentElement.className =this.el.nativeElement.parentElement.className + ' container m-0 ';
  }

  dataChanged(): void {
    //this.parent.jsonData[this.key] = this.jsonData;
  }
  isTextInput(): boolean {
    return this.parentData && (!this.config ||
      (!this.config.input || (this.config.input === '' || this.config.input === 'text'))
    ) && !(this.config.listOptions && this.config.listOptions.length > 0);
  }
  isListInput(): boolean {
    return (this.config.listOptions && this.config.listOptions.length > 0);
  }
}
