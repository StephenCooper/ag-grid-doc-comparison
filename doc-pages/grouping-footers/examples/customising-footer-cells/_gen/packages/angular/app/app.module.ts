import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { MyInnerRenderer } from './my-inner-renderer.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([MyInnerRenderer]),
  ],
  declarations: [AppComponent, MyInnerRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
