import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { CustomHeaderGroup } from './custom-header-group.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomHeaderGroup]),
  ],
  declarations: [AppComponent, CustomHeaderGroup],
  bootstrap: [AppComponent],
})
export class AppModule {}
