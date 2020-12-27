import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { JsonNode } from './common/json-node';
import { JsonNodeHandler } from './common/json-Node-handler';

@Component({
  selector: 'lib-json2crud',
  templateUrl: './json2crud.component.html',
  styleUrls: ['./json2crud.component.css']
})
export class Json2crudComponent extends JsonNode<Json2crudComponent> implements OnInit, AfterViewInit {

  @Input() loadData = ``;
  @Input() saveUrl = ``;
  @Input() config = {};
  @Input() title = '';

  isEditing = false;

  handler: JsonNodeHandler<Json2crudComponent> = new JsonNodeHandler(this, this.resolver, this.entry);;
  @ViewChild('formContainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  constructor(private httpClient: HttpClient, private resolver: ComponentFactoryResolver) {
    super();
  }
  ngAfterViewInit(): void {
    this.handler = new JsonNodeHandler(this, this.resolver, this.entry);
    let jsonData = ``;
    try {
      jsonData = JSON.parse(this.loadData);
      this.handler.handleValue('', jsonData, this.config);
      this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i: number) => {
        this.handler.handleNewNode<T>(node, i);
      });
    } catch {
      this.httpClient.get(this.loadData).subscribe((result: {}) => {
        this.handler.handleValue('', result, this.config);
        this.childrens.forEach(<T extends JsonNode<T>>(node: JsonNode<T>, i: number) => {
          this.handler.handleNewNode<T>(node, i);
        });
      });
    }
  }

  ngOnInit(): void {

  }

}
