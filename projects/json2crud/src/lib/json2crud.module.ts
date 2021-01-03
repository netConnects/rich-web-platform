import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgRatingModule } from 'd-ng-rating';
import { ArrayElementComponent } from './array-element/array-element.component';
import { Json2crudComponent } from './json2crud.component';
import { ObjectElementComponent } from './object-element/object-element.component';
import { ValueElementComponent } from './value-element/value-element.component';
@NgModule({
  declarations: [
    Json2crudComponent,
    ArrayElementComponent,
    ObjectElementComponent,
    ValueElementComponent

  ],
  imports: [
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    NgbAccordionModule,
    NgRatingModule
  ],
  exports: [Json2crudComponent]
})
export class Json2crudModule { }
