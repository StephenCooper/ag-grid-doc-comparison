import { Component } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  SetFilterValuesFuncParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public rowData: any[] | null = [
    { value: 'value 1' },
    { value: 'value 1' },
    { value: 'value 1' },
    { value: 'value 1' },
    { value: 'value 2' },
    { value: 'value 2' },
    { value: 'value 2' },
    { value: 'value 2' },
    { value: 'value 2' },
  ];
  public columnDefs: ColDef[] = [
    {
      headerName: 'Set filter column',
      field: 'value',
      flex: 1,
      filter: 'agSetColumnFilter',
      floatingFilter: true,
      filterParams: filterParams,
    },
  ];

  onGridReady(params: GridReadyEvent) {}
}

var filterParams = {
  values: (params: SetFilterValuesFuncParams) => {
    setTimeout(function () {
      params.success(['value 1', 'value 2']);
    }, 3000);
  },
};
