import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { SliderFloatingFilter } from './slider-floating-filter.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([SliderFloatingFilter]),
  ],
  declarations: [AppComponent, SliderFloatingFilter],
  bootstrap: [AppComponent],
})
export class AppModule {}
