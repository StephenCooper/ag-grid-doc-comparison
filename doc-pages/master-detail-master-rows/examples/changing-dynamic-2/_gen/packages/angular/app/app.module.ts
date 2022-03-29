import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";
import { CallsCellRenderer } from "./calls-cell-renderer.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CallsCellRenderer]),
  ],
  declarations: [AppComponent, CallsCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
