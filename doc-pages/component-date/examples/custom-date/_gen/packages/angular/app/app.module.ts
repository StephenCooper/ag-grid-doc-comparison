import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";

import { CustomDateComponent } from "./custom-date-component.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomDateComponent]),
  ],
  declarations: [AppComponent, CustomDateComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
