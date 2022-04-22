import { AgGridModule } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ColourCellRenderer } from './colour-cell-renderer.component';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RichSelectModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([ColourCellRenderer]),
  ],
  declarations: [AppComponent, ColourCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
