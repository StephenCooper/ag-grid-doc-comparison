// ag-grid
import { AgGridModule } from "@ag-grid-community/angular";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ClickableModule } from "./clickable.module";
import { ClickableParentComponent } from "./clickable.parent.component";
import { RatioModule } from "./ratio.module";
import { RatioParentComponent } from "./ratio.parent.component";
// from rich component
import { RichComponent } from "./rich.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([
      RatioParentComponent,
      ClickableParentComponent,
    ]),
    RatioModule,
    ClickableModule,
  ],
  declarations: [RichComponent],
  bootstrap: [RichComponent],
})
export class AppModule {}
