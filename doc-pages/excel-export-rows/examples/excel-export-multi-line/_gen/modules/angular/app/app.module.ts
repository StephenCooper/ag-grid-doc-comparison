import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "@ag-grid-community/angular";
import { AppComponent } from "./app.component";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { CsvExportModule } from "@ag-grid-community/csv-export";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
  CsvExportModule,
]);

import { MultilineCellRenderer } from "./multiline-cell-renderer.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([MultilineCellRenderer]),
  ],
  declarations: [AppComponent, MultilineCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
