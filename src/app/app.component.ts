import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rich-web-platform';
  config: any = [];
  reset: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  input = {
    data: 'assets/structure.json',
  };
  layoutConfifg = {
    leftPane: {
      open: ''
    }
  };

  loadData = 'assets/structure.json';
  saveUrl = '';
  configOutputJson = {
    node: {
      clonable: false,
      deletable: false,
      rateble: false,
      addProperties: false,
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

      outputText: {
        input: 'textarea',
        label: '',
        class: '  h-100 ',
        expand: true
      },
      header: {
        hidden: true
      }

    }
  };
  inputData = {
    node: {

      'Source language': '',
      'Output language': '',
      inputText: ''
    }
  };
  outputData = {
    node: {

      outputText: ''
    }
  }

  configInputJson = {
    node: {
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
    }
  };

  configJson =

    {
      node: {
        addOrRemove: true,
        input: 'switch',
        menu: {
          hidden: false
        },

        'Sample file': {
          input: 'text'
        },

        'File type': {
          input: 'text'
        },
        language: { key: true, input: 'text' },
        complete: {
          compact: true,
          expand: true
        },
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
      }
    };
  leftPaneOpen = '';
  rightTopPaneOpen = '';
  rightBottomPaneOpen = '';
  saveData(data): void {
    if (data && data.node) {
      this.configInputJson.node['Source language'].listOptions = [];
      this.configInputJson.node['Output language'].listOptions = [];
      data.node.forEach((d) => {
        this.configInputJson.node['Source language'].listOptions.push(d.language);
        this.configInputJson.node['Output language'].listOptions.push(d.language);
      });
    }
  }
  processInput(data): void {

  }

  handleClose(orientation: string): void {
    this.leftPaneOpen = orientation;
  }
  getKey(): string {
    return '';
  }
  ngOnInit(): void {
    //    setInterval(() => this.reset.next(!this.reset.value), 20000);
  }
}
