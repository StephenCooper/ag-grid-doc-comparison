
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AgGridModule } from '@ag-grid-community/angular';
import { AppComponent } from './app.component';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

import { DoublingEditor } from './doubling-editor.component';
import { MoodEditor } from './mood-editor.component';
import { MoodRenderer } from './mood-renderer.component';
import { NumericEditor } from './numeric-editor.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
FormsModule,
    AgGridModule.withComponents([DoublingEditor, MoodEditor, MoodRenderer, NumericEditor])
  ],
  declarations: [
    AppComponent,DoublingEditor,MoodEditor,MoodRenderer,NumericEditor
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
