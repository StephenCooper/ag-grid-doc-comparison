import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { ChildMessageRenderer } from './child-message-renderer.component';
import { CubeRenderer } from './cube-renderer.component';
import { CurrencyRenderer } from './currency-renderer.component';
import { ParamsRenderer } from './params-renderer.component';
import { SquareRenderer } from './square-renderer.component';

// ag-grid

@NgModule({
  imports: [
    BrowserModule,
    AgGridModule.withComponents([
      ChildMessageRenderer,
      CubeRenderer,
      CurrencyRenderer,
      ParamsRenderer,
      SquareRenderer,
    ]),
  ],
  declarations: [
    AppComponent,
    ChildMessageRenderer,
    CubeRenderer,
    CurrencyRenderer,
    ParamsRenderer,
    SquareRenderer,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
