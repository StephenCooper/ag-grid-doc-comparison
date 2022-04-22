import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { DoublingEditor } from './doubling-editor.component';
import { MoodEditor } from './mood-editor.component';
import { MoodRenderer } from './mood-renderer.component';
import { NumericEditor } from './numeric-editor.component';

@Component({
  selector: 'my-app',
  template: `<div style="height: 100%; box-sizing: border-box;">
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      [defaultColDef]="defaultColDef"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: 'Doubling',
      field: 'number',
      cellEditor: DoublingEditor,
      editable: true,
      width: 300,
    },
    {
      field: 'mood',
      cellRenderer: MoodRenderer,
      cellEditor: MoodEditor,
      cellEditorPopup: true,
      editable: true,
      width: 300,
    },
    {
      headerName: 'Numeric',
      field: 'number',
      cellEditor: NumericEditor,
      cellEditorPopup: true,
      editable: true,
      width: 280,
    },
  ];
  public rowData: any[] | null = [
    { name: 'Bob', mood: 'Happy', number: 10 },
    { name: 'Harry', mood: 'Sad', number: 3 },
    { name: 'Sally', mood: 'Happy', number: 20 },
    { name: 'Mary', mood: 'Sad', number: 5 },
    { name: 'John', mood: 'Happy', number: 15 },
    { name: 'Jack', mood: 'Happy', number: 25 },
    { name: 'Sue', mood: 'Sad', number: 43 },
    { name: 'Sean', mood: 'Sad', number: 1335 },
    { name: 'Niall', mood: 'Happy', number: 2 },
    { name: 'Alberto', mood: 'Happy', number: 123 },
    { name: 'Fred', mood: 'Sad', number: 532 },
    { name: 'Jenny', mood: 'Happy', number: 34 },
    { name: 'Larry', mood: 'Happy', number: 13 },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };

  onGridReady(params: GridReadyEvent) {}
}
