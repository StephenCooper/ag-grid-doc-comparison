import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { MySimpleEditor } from './mySimple-editor.component';

// ag-grid

@NgModule({
  imports: [BrowserModule, AgGridModule.withComponents([MySimpleEditor])],
  declarations: [AppComponent, MySimpleEditor],
  bootstrap: [AppComponent],
})
export class AppModule {}
