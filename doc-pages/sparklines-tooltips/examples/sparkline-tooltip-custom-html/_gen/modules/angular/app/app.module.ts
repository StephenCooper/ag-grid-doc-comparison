import { AgGridModule } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule]);

@NgModule({
  imports: [BrowserModule, HttpClientModule, AgGridModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
