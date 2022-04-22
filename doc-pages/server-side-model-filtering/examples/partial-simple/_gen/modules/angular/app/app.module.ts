import { AgGridModule } from '@ag-grid-community/angular';
import { ModuleRegistry } from '@ag-grid-community/core';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, MenuModule]);

@NgModule({
  imports: [BrowserModule, HttpClientModule, AgGridModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
