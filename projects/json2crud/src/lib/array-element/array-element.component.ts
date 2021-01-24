import { Component, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonNode } from '../common/json-node';
import { JsonNodeHandler } from '../common/json-Node-handler';

@Component({
  selector: 'lib-array-element',
  templateUrl: './array-element.component.html',
  styleUrls: ['./array-element.component.scss']
})
export class ArrayElementComponent extends JsonNode<ArrayElementComponent> implements OnInit, OnDestroy {
  static readonly KEY_MAP: Map<string, {}> = new Map();

  @ViewChild('arrayContainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  @Output() cloner: EventEmitter<ArrayElementComponent> = new EventEmitter();
  object = Object;
  createWindow: any;
  handler: JsonNodeHandler<ArrayElementComponent> = new JsonNodeHandler(this, this.resolver, this.entry);
  constructor(private resolver: ComponentFactoryResolver) {
    super();

  }
  ngOnDestroy(): void {
    this.cloner.unsubscribe();
  }


  ngOnInit(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    this.handler.handleArray(this.key, this.jsonData,
      this.config && this.config[this.key] ? this.config[this.key] : this.config, this.globalConfig);
    this.handleNewNodes();
    this.childrenKeyType = ArrayElementComponent.KEY_MAP.get(this.key);

  }

  private handleNewNodes(): void {
    this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i) => {
      this.handler.handleNewNode<T>(this, node, i);
    });
    this.cloner.subscribe(this.handler.clone(this.parent));
  }

  activate(): void {
    //   this.entry.element.nativeElement.parent.class.add('activated');
  }
  deactivate(): void {
    //   this.entry.element.nativeElement.parent.class.remove('activated');
  }
  open(p: any): void {
    this.createWindow = p;
    p.open();
  }

  addInArray(): void {
    const newObject = { ...this.childrenKeyType };
    this.handler.handleNewNode(this, this.handler.handleValue('', this.jsonData, newObject, this.config, this.globalConfig),
      this.jsonData.length, true);
    this.createWindow.close();
  }
}

