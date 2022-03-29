import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";
import { PersonFilter } from "./person-filter.component";
import { YearFilter } from "./year-filter.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([PersonFilter, YearFilter]),
  ],
  declarations: [AppComponent, PersonFilter, YearFilter],
  bootstrap: [AppComponent],
})
export class AppModule {}
