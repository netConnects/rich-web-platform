import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'json2crud',
  templateUrl: './json2crud.component.html',
  styles: [
  ]
})
export class Json2crudComponent implements OnInit {

  constructor() { }
  @Input() loadData = "";
  @Input() saveUrl = "";
  @Input() config = {};
  ngOnInit(): void {
    const jsonData = JSON.parse(this.loadData);
    this.handleValue(jsonData, this.config);
  }
  private handleValue(jsonData: any, config?: any) {
    if (jsonData) {
      if (jsonData instanceof Array && (this.config instanceof Array)) {
        console.log("this is an array we are iterating");
        this.handleArray(jsonData, this.config);
      } else if (jsonData instanceof Object) {
        console.log("this is an object we are looking through");
        this.handleObject(jsonData);
      } else {
      }
    }
  }

  handleObject(jsonData: any) {

  }
  handleArray(jsonData: any[], config: any[]) {
    jsonData.forEach(data => {
      if (config[0]) {
        this.handleValue(data, config[0]);
      }else{
        this.handleValue(data);
      }
    });
  }
}
