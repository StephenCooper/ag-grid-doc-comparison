import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "@ag-grid-community/angular";
import { AppComponent } from "./app.component";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

import { GroupRowInnerRenderer } from "./group-row-inner-renderer.component";
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
