import { AgGridModule } from "@ag-grid-community/angular";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { SimpleCellRenderer } from "./simple-cell-renderer.component";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([SimpleCellRenderer]),
  ],
  declarations: [AppComponent, SimpleCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
