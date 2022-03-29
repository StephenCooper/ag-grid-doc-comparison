import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";
import { NumberFloatingFilterComponent } from "./number-floating-filter-component.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([NumberFloatingFilterComponent]),
  ],
  declarations: [AppComponent, NumberFloatingFilterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
