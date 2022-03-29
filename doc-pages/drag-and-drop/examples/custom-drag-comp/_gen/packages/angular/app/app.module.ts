import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";
import { DragSourceRenderer } from "./drag-source-renderer.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([DragSourceRenderer]),
  ],
  declarations: [AppComponent, DragSourceRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
