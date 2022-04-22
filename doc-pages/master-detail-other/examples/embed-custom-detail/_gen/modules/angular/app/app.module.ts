import { AgGridModule } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DetailCellRenderer } from './detail-cell-renderer.component';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule]);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([DetailCellRenderer]),
  ],
  declarations: [AppComponent, DetailCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
