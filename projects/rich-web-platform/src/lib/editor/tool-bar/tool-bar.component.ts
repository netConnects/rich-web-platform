import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IView } from '../modal/interface/i-view';
import { IPanel } from '../modal/interface/interface';

@Component({
  selector: 'bb-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit, AfterViewInit {

  @Input() editor?: IPanel;
  views: IView[] = [];
  constructor() { }
  ngAfterViewInit(): void {
    this.findViewGroups(this.editor);
  }
  ngOnInit(): void {
  }
  findViewGroups(parent?: IPanel): void {
    if (parent) {
      if (parent.views) {
        this.views.push(...parent.views);
      }
      parent.children.forEach(child => {
        this.findViewGroups(child);
      });
    }
  }
  open(panel: IView): void {
  }
}
