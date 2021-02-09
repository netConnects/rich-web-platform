import { DesignDataInput } from './../common/global-config';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-json-ui-designer',
  templateUrl: './json-ui-designer.component.html',
  styleUrls: ['./json-ui-designer.component.css']
})
export class JsonUiDesignerComponent implements OnInit {

  @Input() config = { node: {} };
  @Input() data: any;
  reset: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  justSaved = false;
  constructor() { }
  dataInputConfig = {
    node: {
      Save: {
        label: 'build'
      },
      Edit: {
        hidden: true
      },
      filter: {
        hidden: true
      },
      Reset: {
        hidden: true
      },
      menu: {
        hidden: true
      },
      header: {
        hidden: true
      },
      dataText: {
        input: 'textarea',
        expand: true,
        label: ''
      }
    }
  };

  dataInput: DesignDataInput = new DesignDataInput();
  configData = {
    ...this.config
  };
  configDataConfig = { node: {} };

  ngOnInit(): void {
    this.dataInput.node.dataText = this.data;
    this.configDataConfig.node = this.config.node;

    this.configData.node = this.config.node;
  }

  loadJson(data): void {
    if (!this.justSaved) {
      this.dataInput.node.dataText = JSON.stringify(data, null, 2);
      this.loadData(this.dataInput);
    }
    this.justSaved = false;
  }

  loadData(data: DesignDataInput): void {
    try {
      const parsedData = JSON.parse(data.node.dataText);
      if (this.data.node) {
        this.data.node = parsedData.node;
      } else {
        this.data = parsedData;
      }
      this.justSaved = true;
      this.reset.next(!this.reset.value);
    } catch (e) {
      console.error(e);
    }
  }
}


