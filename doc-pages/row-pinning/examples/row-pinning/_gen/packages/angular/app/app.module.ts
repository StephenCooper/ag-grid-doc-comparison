
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { CustomPinnedRowRenderer } from './custom-pinned-row-renderer.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomPinnedRowRenderer])
  ],
  declarations: [
    AppComponent, CustomPinnedRowRenderer
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
