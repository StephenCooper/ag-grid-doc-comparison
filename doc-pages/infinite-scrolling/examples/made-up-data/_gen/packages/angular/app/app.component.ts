import { Component } from '@angular/core';
import {
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowModelType]="rowModelType"
    [rowSelection]="rowSelection"
    [maxBlocksInCache]="maxBlocksInCache"
    [suppressRowClickSelection]="true"
    [getRowId]="getRowId"
    [datasource]="datasource"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = getColumnDefs();
  public defaultColDef: ColDef = {
    resizable: true,
  };
  public rowModelType = 'infinite';
  public rowSelection = 'multiple';
  public maxBlocksInCache = 2;
  public getRowId: GetRowIdFunc = function (params: GetRowIdParams) {
    return params.data.a;
  };
  public datasource: IDatasource = getDataSource(100);
  public rowData!: any[];

  onGridReady(params: GridReadyEvent) {}
}

var ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
function getColumnDefs() {
  const columnDefs: ColDef[] = [
    { checkboxSelection: true, headerName: '', width: 60 },
    { headerName: '#', width: 80, valueGetter: 'node.rowIndex' },
  ];
  ALPHABET.forEach(function (letter) {
    columnDefs.push({
      headerName: letter.toUpperCase(),
      field: letter,
      width: 150,
    });
  });
  return columnDefs;
}
function getDataSource(count: number) {
  const dataSource: IDatasource = {
    rowCount: count,
    getRows: function (params: IGetRowsParams) {
      var rowsThisPage: any[] = [];
      for (
        var rowIndex = params.startRow;
        rowIndex < params.endRow;
        rowIndex++
      ) {
        var record: Record<string, string> = {};
        ALPHABET.forEach(function (letter, colIndex) {
          var randomNumber = 17 + rowIndex + colIndex;
          var cellKey = letter.toUpperCase() + (rowIndex + 1);
          record[letter] = cellKey + ' = ' + randomNumber;
        });
        rowsThisPage.push(record);
      }
      // to mimic server call, we reply after a short delay
      setTimeout(function () {
        // no need to pass the second 'rowCount' parameter as we have already provided it
        params.successCallback(rowsThisPage);
      }, 100);
    },
  };
  return dataSource;
}
