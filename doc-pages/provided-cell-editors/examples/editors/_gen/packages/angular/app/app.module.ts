import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";

import { ColourCellRenderer } from "./colour-cell-renderer.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([ColourCellRenderer]),
  ],
  declarations: [AppComponent, ColourCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
