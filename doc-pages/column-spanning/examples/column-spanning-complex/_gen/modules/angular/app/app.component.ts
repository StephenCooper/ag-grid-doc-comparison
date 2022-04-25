import {
  CellClassRules,
  ColDef,
  ColSpanParams,
  GridReadyEvent,
  RowHeightParams,
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
    [getRowHeight]="getRowHeight"
    [rowData]="rowData"
    [defaultColDef]="defaultColDef"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: 'Jan',
      field: 'jan',
      colSpan: (params: ColSpanParams) => {
        if (isHeaderRow(params)) {
          return 6;
        } else if (isQuarterRow(params)) {
          return 3;
        } else {
          return 1;
        }
      },
      cellClassRules: cellClassRules,
    },
    { headerName: 'Feb', field: 'feb' },
    { headerName: 'Mar', field: 'mar' },
    {
      headerName: 'Apr',
      field: 'apr',
      colSpan: (params: ColSpanParams) => {
        if (isQuarterRow(params)) {
          return 3;
        } else {
          return 1;
        }
      },
      cellClassRules: cellClassRules,
    },
    { headerName: 'May', field: 'may' },
    { headerName: 'Jun', field: 'jun' },
  ];
  public getRowHeight: (
    params: RowHeightParams
  ) => number | undefined | null = (params: RowHeightParams) => {
    if (isHeaderRow(params)) {
      return 60;
    }
  };
  public rowData: any[] | null = getData();
  public defaultColDef: ColDef = {
    width: 100,
  };

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }
}

var cellClassRules: CellClassRules = {
  'header-cell': 'data.section === "big-title"',
  'quarters-cell': 'data.section === "quarters"',
};
function isHeaderRow(params: RowHeightParams | ColSpanParams) {
  return params.data.section === 'big-title';
}
function isQuarterRow(params: ColSpanParams) {
  return params.data.section === 'quarters';
}
