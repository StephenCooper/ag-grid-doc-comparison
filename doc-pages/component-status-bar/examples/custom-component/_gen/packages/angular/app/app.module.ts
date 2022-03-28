
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { ClickableStatusBarComponent } from './clickable-status-bar-component.component';
import { CountStatusBarComponent } from './count-status-bar-component.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([ClickableStatusBarComponent, CountStatusBarComponent])
  ],
  declarations: [
    AppComponent, ClickableStatusBarComponent, CountStatusBarComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
