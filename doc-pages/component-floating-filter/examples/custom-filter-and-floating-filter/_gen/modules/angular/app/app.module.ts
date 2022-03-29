import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AgGridModule } from "@ag-grid-community/angular";
import { AppComponent } from "./app.component";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { NumberFilterComponent } from "./number-filter-component.component";
import { NumberFloatingFilterComponent } from "./number-floating-filter-component.component";
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
