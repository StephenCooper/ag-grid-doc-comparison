import { AgGridModule } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CustomLoadingOverlay } from './custom-loading-overlay.component';
import { CustomNoRowsOverlay } from './custom-no-rows-overlay.component';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomLoadingOverlay, CustomNoRowsOverlay]),
  ],
  declarations: [AppComponent, CustomLoadingOverlay, CustomNoRowsOverlay],
  bootstrap: [AppComponent],
})
export class AppModule {}
