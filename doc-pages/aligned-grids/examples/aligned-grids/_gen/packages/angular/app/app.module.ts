import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

// ag-grid

@NgModule({
  imports: [BrowserModule, HttpClientModule, AgGridModule.withComponents([])],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
