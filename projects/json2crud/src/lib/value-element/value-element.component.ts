import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonNodeConfig } from '../common/global-config';
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
  @Input()
  get formValue(): any {
    return this.parentData[this.key];
  }

  label = '';

  @Input()
  key: string;
  @Input()
  config: JsonNodeConfig;
  inputType = '';
  @Input()
  parentData = {};
  handler: JsonNodeHandler<ValueElementComponent> = new JsonNodeHandler(this, this.resolver, this.entry);
  checkbox(): boolean {
    return (typeof this.formValue === 'boolean') || (this.config && this.config.input && this.config.input === 'checkbox');
  }
  ngOnInit(): void {

    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    this.el.nativeElement.className = this.el.nativeElement.className + ' row ';
    this.label = this.key;
    if (this.key && !this.key.includes(' ')) {
      this.label = this.label.replace(/([A-Z])/g, ' $1');
      this.label = this.label.replace(/^(.)/g, x => x[0].toUpperCase());
    }
    if (this.checkbox()) {
      this.inputType = 'checkbox';
    } else if (this.isTextArea()) {
      this.inputType = 'textarea';
    } else if (this.isListInput()) {
      this.inputType = 'list';
    } else {
      this.inputType = 'text';
    }
  }
  isTextArea(): boolean {
    return this.parentData && ((this.config) && (this.config.input === 'textarea'));
  }
  isTextInput(): boolean {
    return this.parentData && (!this.config ||
      (!this.config.input || (this.config.input === '' || this.config.input === 'text'))
    );
  }

  isListInput(): boolean {
    return !!this.config.listOptions;
  }

}
