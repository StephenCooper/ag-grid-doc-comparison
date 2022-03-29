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
import { MatCheckboxComponent } from "./mat-checkbox.component";
import { MatEditorComponentOne } from "./mat-editor-one.component";
import { MatInputComponent } from "./mat-input.component";
import { MatRadioComponent } from "./mat-radio.component";
import { MatSelectComponent } from "./mat-select.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([
      MatCheckboxComponent,
      MatInputComponent,
      MatRadioComponent,
      MatSelectComponent,
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
    MatEditorComponentOne,
    MatCheckboxComponent,
    MatInputComponent,
    MatRadioComponent,
    MatSelectComponent,
  ],
  bootstrap: [MatEditorComponentOne],
})
export class AppModule {}
