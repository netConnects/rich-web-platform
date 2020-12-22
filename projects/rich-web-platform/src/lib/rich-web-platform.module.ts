import { DropableWindowComponent } from './editor/dropable-window/dropable-window.component';
import { NgModule } from '@angular/core';
import { EditorModule } from './editor/editor.module';
/*
 * Public API Surface of rich-web-platform
 */




@NgModule({
  declarations: [],
  imports: [
    EditorModule
  ],
  exports: [EditorModule]
})
export class RichWebPlatformModule { }
