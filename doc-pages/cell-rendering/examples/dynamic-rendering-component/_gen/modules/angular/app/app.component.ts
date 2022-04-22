import {
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
import { GenderRenderer } from './gender-renderer.component';
import { MoodRenderer } from './mood-renderer.component';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    (rowEditingStarted)="onRowEditingStarted($event)"
    (rowEditingStopped)="onRowEditingStopped($event)"
    (cellEditingStarted)="onCellEditingStarted($event)"
    (cellEditingStopped)="onCellEditingStopped($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public rowData: any[] | null = [
    { value: 14, type: 'age' },
    { value: 'female', type: 'gender' },
    { value: 'Happy', type: 'mood' },
    { value: 21, type: 'age' },
    { value: 'male', type: 'gender' },
    { value: 'Sad', type: 'mood' },
  ];
  public columnDefs: ColDef[] = [
    { field: 'value' },
    {
      headerName: 'Rendered Value',
      field: 'value',
      cellRendererSelector: function (params: ICellRendererParams) {
        const moodDetails = {
          component: MoodRenderer,
        };
        const genderDetails = {
          component: GenderRenderer,
          params: { values: ['Male', 'Female'] },
        };
        if (params.data.type === 'gender') return genderDetails;
        else if (params.data.type === 'mood') return moodDetails;
        else return undefined;
      },
    },
    { field: 'type' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };

  onRowEditingStarted(event) {
    console.log('never called - not doing row editing');
  }

  onRowEditingStopped(event) {
    console.log('never called - not doing row editing');
  }

  onCellEditingStarted(event) {
    console.log('cellEditingStarted');
  }

  onCellEditingStopped(event) {
    console.log('cellEditingStopped');
  }

  onGridReady(params: GridReadyEvent) {}
}
