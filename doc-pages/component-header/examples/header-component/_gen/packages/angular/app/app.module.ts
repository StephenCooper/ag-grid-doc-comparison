import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";
import { CustomHeader } from "./custom-header.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomHeader]),
  ],
  declarations: [AppComponent, CustomHeader],
  bootstrap: [AppComponent],
})
export class AppModule {}
