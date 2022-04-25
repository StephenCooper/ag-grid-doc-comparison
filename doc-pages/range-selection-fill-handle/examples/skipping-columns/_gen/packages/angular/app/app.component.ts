import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, FillOperationParams, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [enableFillHandle]="true"
    [suppressClearOnFillReduction]="true"
    [fillOperation]="fillOperation"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    editable: true,
  };
  public fillOperation: (params: FillOperationParams) => any = (
    params: FillOperationParams
  ) => {
    if (params.column.getColId() === 'country') {
      return params.currentCellValue;
    }
    return params.values[params.values.length - 1];
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        params.api!.setRowData(createRowData(data));
      });
  }
}

function createRowData(data: any[]) {
  var rowData = data.slice(0, 100);
  return rowData;
}
