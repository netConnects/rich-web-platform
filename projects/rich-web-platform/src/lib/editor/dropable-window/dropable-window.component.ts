import { Component, OnInit } from '@angular/core';
import { IPanel } from '../modal/interface/interface';
@Component({
  selector: 'bb-dropable-window',
  templateUrl: './dropable-window.component.html',
  styleUrls: ['./dropable-window.component.scss']
})
export class DropableWindowComponent implements OnInit {

  panels: IPanel[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  drop($event: any): void {
  }
}
