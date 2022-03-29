import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AgGridModule } from "@ag-grid-community/angular";
import { AppComponent } from "./app.component";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  StatusBarModule,
  RangeSelectionModule,
]);

import { ClickableStatusBarComponent } from "./clickable-status-bar-component.component";
import { CountStatusBarComponent } from "./count-status-bar-component.component";
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([
      ClickableStatusBarComponent,
      CountStatusBarComponent,
    ]),
  ],
  declarations: [
    AppComponent,
    ClickableStatusBarComponent,
    CountStatusBarComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
