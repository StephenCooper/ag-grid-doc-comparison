import { AgGridModule } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MoodEditor } from './mood-editor.component';
import { NumericCellEditor } from './numeric-cell-editor.component';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
  RichSelectModule,
]);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([MoodEditor, NumericCellEditor]),
  ],
  declarations: [AppComponent, MoodEditor, NumericCellEditor],
  bootstrap: [AppComponent],
})
export class AppModule {}
