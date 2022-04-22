import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent, SportRenderer } from './app.component';

// ag-grid

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([SportRenderer]),
  ],
  declarations: [AppComponent, SportRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
