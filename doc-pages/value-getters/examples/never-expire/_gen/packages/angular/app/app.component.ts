import { Component } from "@angular/core";
import {
  ColDef,
  GetRowIdFunc,
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: ` <div
      style="height: 100%; box-sizing: border-box; padding-top: 20px;"
    >
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine-dark"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [autoGroupColumnDef]="autoGroupColumnDef"
        [columnTypes]="columnTypes"
        [valueCache]="true"
        [valueCacheNeverExpires]="true"
        [rowData]="rowData"
        [suppressAggFuncInHeader]="true"
        [enableCellChangeFlash]="true"
        [enableRangeSelection]="true"
        [groupDefaultExpanded]="groupDefaultExpanded"
        [getRowId]="getRowId"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
    <div style="position: absolute; top: 10px; left: 15px;">
      <button (click)="onUpdateOneValue()">Update One Value</button>
      <button (click)="onExpireValueCache()">Expire Value Cache</button>
      <button (click)="onRefreshCells()">
        Aggregate Data &amp; Refresh Cells
      </button>
    </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "q1", type: "quarterFigure" },
    { field: "q2", type: "quarterFigure" },
    { field: "q3", type: "quarterFigure" },
    { field: "q4", type: "quarterFigure" },
    { field: "year", rowGroup: true, hide: true },
    {
      headerName: "Total",
      colId: "total",
      cellClass: ["number-cell", "total-col"],
      aggFunc: "sum",
      valueFormatter: formatNumber,
      valueGetter: totalValueGetter,
    },
    {
      headerName: "Total x 10",
      cellClass: ["number-cell", "total-col"],
      aggFunc: "sum",
      minWidth: 120,
      valueFormatter: formatNumber,
      valueGetter: total10ValueGetter,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 130,
  };
  public columnTypes: {
    [key: string]: ColDef;
  } = {
    quarterFigure: {
      editable: true,
      cellClass: "number-cell",
      aggFunc: "sum",
      valueFormatter: formatNumber,
      valueParser: function numberParser(params) {
        return Number(params.newValue);
      },
    },
  };
  public rowData: any[] | null = getData();
  public groupDefaultExpanded = 1;
  public getRowId: GetRowIdFunc = function (params) {
    return params.data.id;
  };

  onExpireValueCache() {
    console.log("onInvalidateValueCache -> start");
    this.gridApi.expireValueCache();
    console.log("onInvalidateValueCache -> end");
  }

  onRefreshCells() {
    console.log("onRefreshCells -> start");
    this.gridApi.refreshClientSideRowModel("aggregate");
    this.gridApi.refreshCells();
    console.log("onRefreshCells -> end");
  }

  onUpdateOneValue() {
    var randomId = Math.floor(Math.random() * 10) + "";
    var rowNode = this.gridApi.getRowNode(randomId);
    if (rowNode) {
      var randomCol = ["q1", "q2", "q3", "q4"][Math.floor(Math.random() * 4)];
      var newValue = Math.floor(Math.random() * 1000);
      console.log("onUpdateOneValue -> start");
      rowNode.setDataValue(randomCol, newValue);
      console.log("onUpdateOneValue -> end");
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

var callCount = 1;
var totalValueGetter = function (params: ValueGetterParams) {
  var q1 = params.getValue("q1");
  var q2 = params.getValue("q2");
  var q3 = params.getValue("q3");
  var q4 = params.getValue("q4");
  var result = q1 + q2 + q3 + q4;
  console.log(
    "Total Value Getter (" +
      callCount +
      ", " +
      params.column.getId() +
      "): " +
      [q1, q2, q3, q4].join(", ") +
      " = " +
      result
  );
  callCount++;
  return result;
};
var total10ValueGetter = function (params: ValueGetterParams) {
  var total = params.getValue("total");
  return total * 10;
};
function formatNumber(params: ValueFormatterParams) {
  var number = params.value;
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
