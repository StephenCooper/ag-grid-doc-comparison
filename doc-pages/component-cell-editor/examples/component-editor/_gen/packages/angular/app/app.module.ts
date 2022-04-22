import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { DoublingEditor } from './doubling-editor.component';
import { MoodEditor } from './mood-editor.component';
import { MoodRenderer } from './mood-renderer.component';
import { NumericEditor } from './numeric-editor.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([
      DoublingEditor,
      MoodEditor,
      MoodRenderer,
      NumericEditor,
    ]),
  ],
  declarations: [
    AppComponent,
    DoublingEditor,
    MoodEditor,
    MoodRenderer,
    NumericEditor,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
