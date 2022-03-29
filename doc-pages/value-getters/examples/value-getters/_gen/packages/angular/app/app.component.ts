import { Component } from "@angular/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ValueGetterParams,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: "#",
      maxWidth: 100,
      valueGetter: hashValueGetter,
    },
    { field: "a" },
    { field: "b" },
    {
      headerName: "A + B",
      colId: "a&b",
      valueGetter: abValueGetter,
    },
    {
      headerName: "A * 1000",
      minWidth: 95,
      valueGetter: a1000ValueGetter,
    },
    {
      headerName: "B * 137",
      minWidth: 90,
      valueGetter: b137ValueGetter,
    },
    {
      headerName: "Random",
      minWidth: 90,
      valueGetter: randomValueGetter,
    },
    {
      headerName: "Chain",
      valueGetter: chainValueGetter,
    },
    {
      headerName: "Const",
      minWidth: 85,
      valueGetter: constValueGetter,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 75,
    // cellClass: 'number-cell'
  };
  public rowData: any[] | null = createRowData();

  onGridReady(params: GridReadyEvent) {}
}

var hashValueGetter = function (params: ValueGetterParams) {
  return params.node ? params.node.rowIndex : null;
};
function abValueGetter(params: ValueGetterParams) {
  return params.data.a + params.data.b;
}
var a1000ValueGetter = function (params: ValueGetterParams) {
  return params.data.a * 1000;
};
var b137ValueGetter = function (params: ValueGetterParams) {
  return params.data.b * 137;
};
var randomValueGetter = function () {
  return Math.floor(Math.random() * 1000);
};
var chainValueGetter = function (params: ValueGetterParams) {
  return params.getValue("a&b") * 1000;
};
var constValueGetter = function () {
  return 99999;
};
function createRowData() {
  var rowData = [];
  for (var i = 0; i < 100; i++) {
    rowData.push({
      a: Math.floor(i % 4),
      b: Math.floor(i % 7),
    });
  }
  return rowData;
}
