
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from '@ag-grid-community/angular';
import { AppComponent } from './app.component';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MultiFilterModule, SetFilterModule, MenuModule, ClipboardModule, FiltersToolPanelModule])

import { YearFilter } from './year-filter.component';
import { YearFloatingFilter } from './year-floating-filter.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([YearFilter, YearFloatingFilter])
  ],
  declarations: [
    AppComponent,YearFilter,YearFloatingFilter
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
