import { PropertyTester } from './../common/global-config';
import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonNode } from '../common/json-node';
import { JsonNodeHandler } from '../common/json-Node-handler';

@Component({
  selector: 'lib-object-element',
  templateUrl: './object-element.component.html',
  styleUrls: ['./object-element.component.scss']
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
    // this.entry.remove(this.entry.indexOf(this.entry.element.nativeElement));
    this.removed = true;
    console.log('pre remove: ' + this.parent.JSON_DATA);
    console.log('pre remove: ch:' + this.parent.childrens);
    this.parent.removeThis(this);
    this.parent.reset(true);
    console.log('post remove: ' + this.parent.JSON_DATA);
    console.log('post remove: ch:' + this.parent.childrens);


  }

  ngOnInit(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    this.handler.handleObject(this.key, this.jsonData, this.config[this.key] || this.config, this.globalConfig);
    if (!this.title) {
      Object.keys(this.config).forEach(element => {
        if (this.config[element].key) {
          this.handler.handleValue(element, this.jsonData, '', this.config[element], this.globalConfig);
          this.title = element + '*';
        }
      });
    }
    this.setLabel();
    this.handleNewNodes();
  }

  moveUp(): void {
    if (this.index) {
      const d = this.parent.JSON_DATA[this.index - 1];
      this.parent.JSON_DATA[this.index - 1] = this.JSON_DATA;
      this.parent.JSON_DATA[this.index] = d;
      this.parent.reset();
    }
  }
  moveDown(): void {
    if (this.index < this.parent.JSON_DATA.length - 1) {
      const d = this.parent.JSON_DATA[this.index + 1];
      this.parent.JSON_DATA[this.index + 1] = this.JSON_DATA;
      this.parent.JSON_DATA[this.index] = d;
      this.parent.reset();
    }
  }
  private handleNewNodes(): void {

    this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i) => {
      if (this.tester.isValidToAdd(node.config)) {
        this.componentRefChildrens.push(this.handler.handleNewNode<T>(this, node, i));
      }
    });

    this.cloner.subscribe(this.parent.handler.clone(this.parent));

  }

}
