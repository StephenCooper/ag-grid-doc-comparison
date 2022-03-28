
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { PartialMatchFilter } from './partial-match-filter.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
FormsModule,
    AgGridModule.withComponents([PartialMatchFilter])
  ],
  declarations: [
    AppComponent, PartialMatchFilter
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
