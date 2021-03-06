import {
  ColDef,
  GridReadyEvent,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'sale',
      headerName: 'Sale ($)',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      valueFormatter: numberValueFormatter,
    },
    {
      field: 'sale',
      headerName: 'Sale',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      filterParams: saleFilterParams,
      valueFormatter: saleValueFormatter,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
  };
  public rowData: any[] | null = getData();

  onGridReady(params: GridReadyEvent) {}
}

var numberValueFormatter = function (params: ValueFormatterParams) {
  return params.value.toFixed(2);
};
var saleFilterParams = {
  allowedCharPattern: '\\d\\-\\,\\$',
  numberParser: (text: string | null) => {
    return text == null
      ? null
      : parseFloat(text.replace(',', '.').replace('$', ''));
  },
};
var saleValueFormatter = function (params: ValueFormatterParams) {
  var formatted = params.value.toFixed(2).replace('.', ',');
  if (formatted.indexOf('-') === 0) {
    return '-$' + formatted.slice(1);
  }
  return '$' + formatted;
};
