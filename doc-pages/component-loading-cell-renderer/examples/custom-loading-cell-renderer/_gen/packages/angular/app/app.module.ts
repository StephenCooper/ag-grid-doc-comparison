import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";

import { CustomLoadingCellRenderer } from "./custom-loading-cell-renderer.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomLoadingCellRenderer]),
  ],
  declarations: [AppComponent, CustomLoadingCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
