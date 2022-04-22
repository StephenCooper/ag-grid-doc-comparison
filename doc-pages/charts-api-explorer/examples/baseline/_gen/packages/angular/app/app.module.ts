import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, AgChartsAngularModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
