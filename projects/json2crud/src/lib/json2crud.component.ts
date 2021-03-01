import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit, Component, ComponentFactoryResolver, ComponentRef,
  EventEmitter,
  HostBinding,
  Input, OnInit, Output, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GlobalConfig, JsonNodeConfig } from './common/global-config';
import { JsonNode } from './common/json-node';
import { JsonNodeHandler } from './common/json-Node-handler';

@Component({
  selector: 'lib-json2crud',
  templateUrl: './json2crud.component.html',
  styleUrls: ['./json2crud.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class Json2crudComponent extends JsonNode<Json2crudComponent> implements OnInit, AfterViewInit {

  @Input() loadData: any;
  @Input() foldingDirection: 'x' | 'y' | '' = '';
  closingDirection: 'x' | 'y' | '' = '';
  @Input() saveUrl = ``;
  @Input() config: JsonNodeConfig;
  @Input() title = '';
  @Input() @HostBinding('style.background-color') bgColor: '';
  @Input() @HostBinding('style.max-width') maxWidth = 'unset';
  @Input() resetFlag: Observable<boolean>;
  @Output() save: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() closed: EventEmitter<string> = new EventEmitter<string>();

  globalConfig: GlobalConfig = new GlobalConfig();
  handler: JsonNodeHandler<Json2crudComponent> = new JsonNodeHandler(this, this.resolver, this.entry);
  designWindow: any;
  @ViewChild('formContainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(public dialog: MatDialog, private httpClient: HttpClient, private resolver: ComponentFactoryResolver) {
    super();
  }

  design(template: any): void {
    const dialogRef = this.dialog.open(template, { width: '100%', height: '100%' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleOpen(bubble = true): void {
    if (this.closingDirection) {
      this.closingDirection = '';
      this.maxWidth = 'unset';
    } else {
      this.closingDirection = this.foldingDirection;
      if (this.closingDirection === 'y') {
        this.maxWidth = '40px';
      }
    }
    if (bubble) {
      this.closed.emit(this.closingDirection);
    }
  }

  saveData(): void {
    console.log(this.jsonData);
    this.save.emit(this.jsonData);
    this.handleEdit();
  }

  ngAfterViewInit(): void {
    if (this.resetFlag) {
      this.resetFlag.subscribe(b => this.reset(true));
    } else {
      this.parseData();
    }
  }
  parseData(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    this.jsonData = ``;
    try {
      if (this.loadData && (typeof this.loadData === 'string')) {
        this.jsonData = JSON.parse(this.loadData + '');
      } else {
        this.jsonData = this.loadData;
      }
      this.handleData(this.jsonData);
      this.saveData();
      this.loadConfig();
    } catch {
      this.httpClient.get(this.loadData).subscribe((result: {}) => {
        this.jsonData = result;
        this.handleData(result);
        this.saveData();
        this.loadConfig();
      });
    }
  }

  loadConfig(): void {
    this.handleEdit();
  }

  private handleEdit(): void {
    this.globalConfig.isEditing = !((this.show(this.config.node['Edit'])) || this.config.node['Edit'].enabled);
  }

  getText(name: string): string {
    return this.config.node[name]?.label || name;
  }

  handleData(result: any): void {
    this.handler.handleValue('', result, result.node, this.config.node, this.globalConfig);
    this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i: number) => {
      this.componentRefChildrens.push(this.handler.handleNewNode<T>(this, node, i));
    });
  }

  ngOnInit(): void {
  }
}
