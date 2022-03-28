
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { GenderCellRenderer } from './gender-cell-renderer.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([GenderCellRenderer])
  ],
  declarations: [
    AppComponent, GenderCellRenderer
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
