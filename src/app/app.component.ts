import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rich-web-platform';
  loadData = "";
  saveUrl = "";
  configJson = [
    {
      "language": { "type": "key", "input": "text" },
      "exclude": [],
      "addOrRemove": true,
      "parsers": [{
        "parser": { "type": "key" },
        "exclude": [],
        "addOrRemove": true
      }]
    }
  ]
  getKey(): string {
    return '';
  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    const jsonData = JSON.parse(this.loadData);
    this.handleValue(jsonData);
  }
  private handleValue(jsonData: any) {
    if (jsonData) {
      if (jsonData instanceof Array) {
        console.log("this is an array we are iterating");
        this.handleArray(jsonData);
      } else if (jsonData instanceof Object) {
        console.log("this is an object we are looking through");
        this.handleObject(jsonData);
      } else {
      }
    }
  }

  handleObject(jsonData: any) {

  }
  handleArray(jsonData: any[]) {
    jsonData.forEach(data => {
      this.handleValue(data);
    });
  }
}
