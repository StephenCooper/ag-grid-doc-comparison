import { AgGridModule } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GenderRenderer } from './gender-renderer.component';
import { MoodEditor } from './mood-editor.component';
import { MoodRenderer } from './mood-renderer.component';
import { NumericEditor } from './numeric-editor.component';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RichSelectModule]);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([
      GenderRenderer,
      MoodEditor,
      MoodRenderer,
      NumericEditor,
    ]),
  ],
  declarations: [
    AppComponent,
    GenderRenderer,
    MoodEditor,
    MoodRenderer,
    NumericEditor,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
