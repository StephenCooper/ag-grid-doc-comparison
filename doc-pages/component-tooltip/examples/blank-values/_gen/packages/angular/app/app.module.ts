import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";
import { CustomTooltip } from "./custom-tooltip.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomTooltip]),
  ],
  declarations: [AppComponent, CustomTooltip],
  bootstrap: [AppComponent],
})
export class AppModule {}
