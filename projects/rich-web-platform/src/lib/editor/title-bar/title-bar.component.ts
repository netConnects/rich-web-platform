import { Component, Input, OnInit } from '@angular/core';
import { ITitleBar } from '../modal/interface/i-title-bar';
import { IView } from '../modal/interface/i-view';
@Component({
  selector: 'bb-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit, ITitleBar {
  views: IView[] = [];
  @Input() name = '';
  constructor() { }
  getSource(): string {
    throw new Error('Method not implemented.');
  }
  setTitle(view: IView): void {
    this.views[view.name] = view;
  }
  getTitle(name: string | any): IView | undefined {
    return this.views[name];
  }
  ngOnInit(): void {
  }

}
