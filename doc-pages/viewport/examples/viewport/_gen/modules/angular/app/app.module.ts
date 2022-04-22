import { AgGridModule } from '@ag-grid-community/angular';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ViewportRowModelModule } from '@ag-grid-enterprise/viewport-row-model';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ViewportRowModelModule]);

@NgModule({
  imports: [BrowserModule, HttpClientModule, AgGridModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
