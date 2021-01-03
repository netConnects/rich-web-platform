import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit, Component, ComponentFactoryResolver, ComponentRef,
  Input, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';
import { GlobalConfig, JsonNodeConfig } from './common/global-config';
import { JsonNode } from './common/json-node';
import { JsonNodeHandler } from './common/json-Node-handler';

@Component({
  selector: 'lib-json2crud',
  templateUrl: './json2crud.component.html',
  styleUrls: ['./json2crud.component.scss']
})
export class Json2crudComponent extends JsonNode<Json2crudComponent> implements OnInit, AfterViewInit {

  @Input() loadData = ``;
  @Input() saveUrl = ``;
  @Input() config: JsonNodeConfig;
  @Input() title = '';
  searchText = '';
  globalConfig: GlobalConfig = new GlobalConfig();
  componentRefChildrens: ComponentRef<any>[] = [];
  handler: JsonNodeHandler<Json2crudComponent> = new JsonNodeHandler(this, this.resolver, this.entry);
  @ViewChild('formContainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  constructor(private httpClient: HttpClient, private resolver: ComponentFactoryResolver) {
    super();
  }
  ngAfterViewInit(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    let jsonData = ``;
    try {
      jsonData = JSON.parse(this.loadData);
      this.handleData(jsonData);
    } catch {
      this.httpClient.get(this.loadData).subscribe((result: {}) => {
        this.handleData(result);
      });
    }
  }
  reset(): void {
    if (this.globalConfig.isEditing) {
      this.globalConfig.isEditing = false;
      this.componentRefChildrens.forEach(ref => {
        ref.destroy();
      });
      delete this.childrens;
      delete this.componentRefChildrens;
      this.componentRefChildrens = [];
      this.childrens = [];
      this.ngAfterViewInit();
    }
  }




  private handleData(result: {}): void {
    this.handler.handleValue('', result, this.config, this.globalConfig);
    this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i: number) => {
      this.componentRefChildrens.push(this.handler.handleNewNode<T>(this, node, i));
    });
  }

  ngOnInit(): void {

  }

}
