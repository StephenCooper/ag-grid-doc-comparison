
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { FullWidthCellRenderer } from './full-width-cell-renderer.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([FullWidthCellRenderer])
  ],
  declarations: [
    AppComponent, FullWidthCellRenderer
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
