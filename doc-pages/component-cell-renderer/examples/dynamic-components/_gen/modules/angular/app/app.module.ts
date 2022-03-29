// ag-grid
import { AgGridModule } from "@ag-grid-community/angular";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ChildMessageRenderer } from "./child-message-renderer.component";
import { CubeRenderer } from "./cube-renderer.component";
import { CurrencyRenderer } from "./currency-renderer.component";
import { ParamsRenderer } from "./params-renderer.component";
import { SquareRenderer } from "./square-renderer.component";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

@NgModule({
  imports: [
    BrowserModule,
    AgGridModule.withComponents([
      ChildMessageRenderer,
      CubeRenderer,
      CurrencyRenderer,
      ParamsRenderer,
      SquareRenderer,
    ]),
  ],
  declarations: [
    AppComponent,
    ChildMessageRenderer,
    CubeRenderer,
    CurrencyRenderer,
    ParamsRenderer,
    SquareRenderer,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
