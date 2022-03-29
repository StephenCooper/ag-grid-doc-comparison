import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "@ag-grid-community/angular";
import { AppComponent } from "./app.component";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { CustomLoadingOverlay } from "./custom-loading-overlay.component";
import { CustomNoRowsOverlay } from "./custom-no-rows-overlay.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomLoadingOverlay, CustomNoRowsOverlay]),
  ],
  declarations: [AppComponent, CustomLoadingOverlay, CustomNoRowsOverlay],
  bootstrap: [AppComponent],
})
export class AppModule {}
