// ag-grid
import { AgGridModule } from "@ag-grid-community/angular";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DaysFrostRenderer } from "./days-frost-renderer.component";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([DaysFrostRenderer]),
  ],
  declarations: [AppComponent, DaysFrostRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
