import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "@ag-grid-community/angular";
import { AppComponent } from "./app.component";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { SideBarModule } from "@ag-grid-enterprise/side-bar";
import { StatusBarModule } from "@ag-grid-enterprise/status-bar";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
  CsvExportModule,
  ExcelExportModule,
  GridChartsModule,
  ClipboardModule,
  RangeSelectionModule,
  RowGroupingModule,
  MultiFilterModule,
  SideBarModule,
  StatusBarModule,
]);

@NgModule({
  imports: [BrowserModule, HttpClientModule, AgGridModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
