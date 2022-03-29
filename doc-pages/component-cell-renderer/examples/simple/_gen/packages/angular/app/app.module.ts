import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";

import { MedalCellRenderer } from "./medal-cell-renderer.component";
import { TotalValueRenderer } from "./total-value-renderer.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([MedalCellRenderer, TotalValueRenderer]),
  ],
  declarations: [AppComponent, MedalCellRenderer, TotalValueRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
