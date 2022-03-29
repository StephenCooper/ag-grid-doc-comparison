import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";

import { CustomCellRenderer } from "./custom-cell-renderer.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomCellRenderer]),
  ],
  declarations: [AppComponent, CustomCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
