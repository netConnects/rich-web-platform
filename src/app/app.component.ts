import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rich-web-platform';
  config: any = [];

  input = {
    data: 'assets/structure.json',
  };


  loadData = 'assets/structure.json';
  saveUrl = '';
  configOutputJson = {
    filter: {
      hidden: true
    },
    Reset: {
      hidden: true
    },

    Save: {
      hidden: true
    },
    Edit: {
      hidden: true
    },
    menu: { hidden: true },
    clonable: false,
    deletable: false,
    rateble: false,
    addProperties: false,
    outputText: {
      input: 'textarea',
      label: '',
      class: '  h-100 ',
      expand: true
    },
    header: {
      hidden: true
    }

  };
  inputData = {
    'Source language': '',
    'Output language': '',
    inputText: ''
  };
  outputData = {
    outputText: ''
  }

  configInputJson = {
    filter: {
      hidden: true
    },
    'Source language': {
      listOptions: [],
      class: '  col-12 col-sm-5 ',
      compact: true


    },
    'Output language': {
      listOptions: [],
      class: '  col-12 col-sm-5 ',
      expand: true,
      compact: true
    },
    inputText: {
      input: 'textarea',
      label: '',
      class: ' h-100 ',
      expand: true
    },
    Reset: {
      hidden: true
    },
    Save: {
      label: 'Process'
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
  };

  configJson =
    {
      menu: {
        hidden: true
      },
      language: { key: true, input: 'text' },
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
  saveData(data): void {
    if (data) {
      this.configInputJson['Source language'].listOptions = [];
      this.configInputJson['Output language'].listOptions = [];
      data.forEach((d) => {
        this.configInputJson['Source language'].listOptions.push(d.language);
        this.configInputJson['Output language'].listOptions.push(d.language);
      });
    }
  }
  processInput(data): void {

  }

  getKey(): string {
    return '';
  }
}
