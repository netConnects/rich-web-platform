import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropableWindowComponent } from './dropable-window/dropable-window.component';
import { PanelDividerComponent } from './panel/panel-divider/panel-divider.component';
import { PanelComponent } from './panel/panel.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
@NgModule({
  declarations: [
    TitleBarComponent,
    DropableWindowComponent,
    ToolBarComponent,
    PanelComponent,
    PanelDividerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TitleBarComponent,
    DropableWindowComponent,
    ToolBarComponent,
    PanelComponent,
    PanelDividerComponent
  ],
  providers: [],
})
export class EditorModule { }
