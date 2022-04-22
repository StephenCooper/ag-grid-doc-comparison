import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { YearFilter } from './year-filter.component';
import { YearFloatingFilter } from './year-floating-filter.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([YearFilter, YearFloatingFilter]),
  ],
  declarations: [AppComponent, YearFilter, YearFloatingFilter],
  bootstrap: [AppComponent],
})
export class AppModule {}
