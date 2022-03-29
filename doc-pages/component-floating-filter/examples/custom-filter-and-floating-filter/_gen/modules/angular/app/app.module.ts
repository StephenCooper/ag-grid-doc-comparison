import { AgGridModule } from "@ag-grid-community/angular";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NumberFilterComponent } from "./number-filter-component.component";
import { NumberFloatingFilterComponent } from "./number-floating-filter-component.component";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([
      NumberFilterComponent,
      NumberFloatingFilterComponent,
    ]),
  ],
  declarations: [
    AppComponent,
    NumberFilterComponent,
    NumberFloatingFilterComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
