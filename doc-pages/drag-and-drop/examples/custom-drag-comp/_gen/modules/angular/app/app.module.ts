
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from '@ag-grid-community/angular';
import { AppComponent } from './app.component';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

import { DragSourceRenderer } from './drag-source-renderer.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([DragSourceRenderer])
  ],
  declarations: [
    AppComponent,DragSourceRenderer
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
