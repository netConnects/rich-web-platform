import { ValueElementComponent } from './../value-element/value-element.component';
import { AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonNode } from '../common/json-node';
import { JsonNodeHandler } from '../common/json-Node-handler';

@Component({
  selector: 'lib-array-element',
  templateUrl: './array-element.component.html',
  styleUrls: ['./array-element.component.scss']
})
export class ArrayElementComponent extends JsonNode<ArrayElementComponent> implements OnInit, OnDestroy, AfterViewInit {
  static readonly KEY_MAP: Map<string, {}> = new Map();

  @ViewChild('arrayContainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  @Output() cloner: EventEmitter<ArrayElementComponent> = new EventEmitter();
  object = Object;
  createWindow: any;
  handler: JsonNodeHandler<ArrayElementComponent> = new JsonNodeHandler(this, this.resolver, this.entry);
  configJson = {
    node: {
      filter: {
        hidden: true
      },
      Reset: {
        hidden: true
      },
      Save: {
        label: 'Create'
      },
      Edit: {
        hidden: true,
        disabled: false
      },
      menu: {
        hidden: true
      },
      header: {
        hidden: true
      }
    }
  };
  initCreate: boolean;
  constructor(private resolver: ComponentFactoryResolver) {
    super();

  }
  ngAfterViewInit(): void {
    this.childrenKeyType = ArrayElementComponent.KEY_MAP.get(this.key);
  }
  ngOnDestroy(): void {
    this.cloner.unsubscribe();
  }
  parseData(): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    this.handler.handleArray(this.key, this.jsonData,
      this.config[this.key] || this.config, this.globalConfig);
    this.childrenKeyType = ArrayElementComponent.KEY_MAP.get(this.key) || {};
    this.handleNewNodes();
    this.setLabel();



  }

  private handleNewNodes(): void {
    this.parent.childrens.push(this);
    this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i) => {
      if (node.type.name === 'ValueElementComponent') {
        this.childrenKeyType[this.key] = '';
      }
      this.componentRefChildrens.push(this.handler.handleNewNode<T>(this, node, i));
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
    this.initCreate = false;
    p.open();
  }

  addInArray(data: any): void {
    if (this.initCreate) {
      let newObject;
      let key = '';
      if (this.childrenKeyType) {
        if (Object.keys(this.childrenKeyType).length === 1 && this.childrenKeyType[this.key]) {
          newObject = this.childrenKeyType[this.key];
          key = this.jsonData.length;
        } else {
          newObject = { ...this.childrenKeyType };
        }
        this.handler.handleNewNode(this, this.handler.handleValue(key, this.jsonData, newObject, this.config, this.globalConfig),
          this.jsonData.length, true);
        this.createWindow.close();
      }
    } else {
      this.initCreate = true;
    }
  }

}

