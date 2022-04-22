import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { SimpleCellRenderer } from './simple-cell-renderer.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([SimpleCellRenderer]),
  ],
  declarations: [AppComponent, SimpleCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
