import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";

import { GenderRenderer } from "./gender-renderer.component";
import { MoodRenderer } from "./mood-renderer.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([GenderRenderer, MoodRenderer]),
  ],
  declarations: [AppComponent, GenderRenderer, MoodRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
