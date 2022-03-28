
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { MoodEditor } from './mood-editor.component';
import { NumericCellEditor } from './numeric-cell-editor.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
FormsModule,
    AgGridModule.withComponents([MoodEditor, NumericCellEditor])
  ],
  declarations: [
    AppComponent, MoodEditor, NumericCellEditor
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
