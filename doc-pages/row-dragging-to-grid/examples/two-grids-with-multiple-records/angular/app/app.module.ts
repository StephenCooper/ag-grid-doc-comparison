// ag-grid
import { AgGridModule } from "@ag-grid-community/angular";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent, SportRenderer } from "./app.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([SportRenderer]),
  ],
  declarations: [AppComponent, SportRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
