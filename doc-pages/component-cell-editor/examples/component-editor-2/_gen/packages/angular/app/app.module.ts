import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { GenderRenderer } from './gender-renderer.component';
import { MoodEditor } from './mood-editor.component';
import { MoodRenderer } from './mood-renderer.component';
import { NumericEditor } from './numeric-editor.component';

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
