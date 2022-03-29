import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";
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
