import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { DaysFrostRenderer } from './days-frost-renderer.component';

// ag-grid

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([DaysFrostRenderer]),
  ],
  declarations: [AppComponent, DaysFrostRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
