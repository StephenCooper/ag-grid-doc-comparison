import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";
import { MultilineCellRenderer } from "./multiline-cell-renderer.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([MultilineCellRenderer]),
  ],
  declarations: [AppComponent, MultilineCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
