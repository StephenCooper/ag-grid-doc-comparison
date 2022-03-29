// ag-grid
import { AgGridModule } from "@ag-grid-community/angular";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { MySimpleEditor } from "./mySimple-editor.component";

// Required feature modules are registered in app.module.ts
// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);
@NgModule({
  imports: [BrowserModule, AgGridModule.withComponents([MySimpleEditor])],
  declarations: [AppComponent, MySimpleEditor],
  bootstrap: [AppComponent],
})
export class AppModule {}
