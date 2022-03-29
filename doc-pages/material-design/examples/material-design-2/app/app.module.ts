// ag-grid
import { AgGridModule } from "@ag-grid-community/angular";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
// material design
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ColumnAlignmentService } from "./columnAlignmentService";
import { MatButtonToggleHeaderComponent } from "./mat-button-toggle.component";
import { MatEditorComponentTwo } from "./mat-editor-two.component";
import { MatProgressSpinnerComponent } from "./mat-progress-spinner.component";
import { MatSliderComponent } from "./mat-slider.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([
      MatSliderComponent,
      MatButtonToggleHeaderComponent,
      MatProgressSpinnerComponent,
    ]),
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatCardModule,
  ],
  declarations: [
    MatEditorComponentTwo,
    MatSliderComponent,
    MatButtonToggleHeaderComponent,
    MatProgressSpinnerComponent,
  ],
  providers: [ColumnAlignmentService],
  bootstrap: [MatEditorComponentTwo],
})
export class AppModule {}
