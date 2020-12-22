import { Json2crudModule } from './../../projects/json2crud/src/lib/json2crud.module';
import { RichWebPlatformModule } from 'rich-web-platform';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RichWebPlatformModule,
    Json2crudModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
