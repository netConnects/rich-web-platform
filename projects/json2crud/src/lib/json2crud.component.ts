import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit, Component, ComponentFactoryResolver, ComponentRef,
  EventEmitter,
  HostBinding,
  Input, OnInit, Output, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
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
  @Input() saveUrl = ``;
  @Input() config: JsonNodeConfig;
  @Input() title = '';
  @Input() @HostBinding('style.background-color') bgColor: '';
  @Input() resetFlag: Observable<boolean>;
  @Output() save: EventEmitter<{}> = new EventEmitter<{}>();

  searchText = '';
  globalConfig: GlobalConfig = new GlobalConfig();
  componentRefChildrens: ComponentRef<any>[] = [];
  handler: JsonNodeHandler<Json2crudComponent> = new JsonNodeHandler(this, this.resolver, this.entry);

  @ViewChild('formContainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private httpClient: HttpClient, private resolver: ComponentFactoryResolver) {
    super();
  }
  design(): void {

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
  private parseData(): void {
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
    this.globalConfig.isEditing = !((this.show(this.config['Edit'])) || this.config['Edit'].enabled);
  }

  getText(name: string): string {
    return this.config[name] && this.config[name].label ? this.config[name].label : name;
  }

  reset(force = false): void {

    if (this.globalConfig.isEditing || force) {
      this.globalConfig.isEditing = false;
      this.componentRefChildrens.forEach(ref => {
        ref.destroy();
      });
      delete this.childrens;
      delete this.componentRefChildrens;
      this.componentRefChildrens = [];
      this.childrens = [];
      this.parseData();
    }
  }

  private handleData(result: {}): void {
    this.handler.handleValue('', result, result, this.config, this.globalConfig);
    this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i: number) => {
      this.componentRefChildrens.push(this.handler.handleNewNode<T>(this, node, i));
    });

  }

  ngOnInit(): void {

  }

}
