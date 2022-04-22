import { AgGridModule } from '@ag-grid-community/angular';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CustomLoadingCellRenderer } from './custom-loading-cell-renderer.component';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomLoadingCellRenderer]),
  ],
  declarations: [AppComponent, CustomLoadingCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
