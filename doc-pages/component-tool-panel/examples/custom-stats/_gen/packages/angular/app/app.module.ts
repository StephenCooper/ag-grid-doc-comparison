import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { CustomStatsToolPanel } from './custom-stats-tool-panel.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomStatsToolPanel]),
  ],
  declarations: [AppComponent, CustomStatsToolPanel],
  bootstrap: [AppComponent],
})
export class AppModule {}
