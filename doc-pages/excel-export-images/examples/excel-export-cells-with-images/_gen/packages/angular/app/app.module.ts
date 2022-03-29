import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";

import { CountryCellRenderer } from "./country-cell-renderer.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CountryCellRenderer]),
  ],
  declarations: [AppComponent, CountryCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
