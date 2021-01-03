import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rich-web-platform';

  input = {
    data: 'assets/structure.json',

  };

  inputConfig = {
    header: false,
    data: {
      input: 'textarea',
      header: false
    }
  };

  loadData = 'assets/structure.json';
  saveUrl = '';
  configJson =
    {
      language: { key: true, input: 'text', hidden: true },
      addOrRemove: true,
      input: 'switch',
      replace: {
        name: {
          key: true
        }
      },
      parsers: {
        name: {
          key: true
        }
      }
    };

  getKey(): string {
    return '';
  }
}
