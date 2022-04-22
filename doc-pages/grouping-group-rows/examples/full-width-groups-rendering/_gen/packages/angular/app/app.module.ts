import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { GroupRowInnerRenderer } from './group-row-inner-renderer.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([GroupRowInnerRenderer]),
  ],
  declarations: [AppComponent, GroupRowInnerRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
