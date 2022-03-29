import { Component } from "@angular/core";
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RefreshCellsParams,
  RowNode,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div class="example-header">
      <div>
        <button (click)="scrambleAndRefreshAll()">
          Scramble &amp; Refresh All
        </button>
        <button (click)="scrambleAndRefreshLeftToRight()">
          Scramble &amp; Refresh Left to Right
        </button>
        <button (click)="scrambleAndRefreshTopToBottom()">
          Scramble &amp; Refresh Top to Bottom
        </button>
      </div>
      <div>
        <label>
          <input type="checkbox" id="forceRefresh" />
          Force Refresh
        </label>
        <label>
          <input type="checkbox" id="suppressFlash" />
          Suppress Flash
        </label>
      </div>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [pinnedTopRowData]="pinnedTopRowData"
      [pinnedBottomRowData]="pinnedBottomRowData"
      [enableCellChangeFlash]="true"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "a", suppressCellFlash: true },
    { field: "b" },
    { field: "c" },
    { field: "d" },
    { field: "e" },
    { field: "f" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public rowData: any[] | null = [];
  public pinnedTopRowData: any[] = [];
  public pinnedBottomRowData: any[] = [];

  scrambleAndRefreshAll() {
    scramble();
    var params = {
      force: isForceRefreshSelected(),
      suppressFlash: isSuppressFlashSelected(),
    };
    this.gridApi.refreshCells(params);
  }

  scrambleAndRefreshLeftToRight() {
    scramble();
    var api = this.gridApi!;
    ["a", "b", "c", "d", "e", "f"].forEach(function (col, index) {
      var millis = index * 100;
      var params = {
        force: isForceRefreshSelected(),
        suppressFlash: isSuppressFlashSelected(),
        columns: [col],
      };
      callRefreshAfterMillis(params, millis, api);
    });
  }

  scrambleAndRefreshTopToBottom() {
    scramble();
    var frame = 0;
    var i;
    var rowNode;
    var api = this.gridApi!;
    for (i = 0; i < api.getPinnedTopRowCount(); i++) {
      rowNode = api.getPinnedTopRow(i)!;
      refreshRow(rowNode, api);
    }
    for (i = 0; i < this.gridApi.getDisplayedRowCount(); i++) {
      rowNode = this.gridApi.getDisplayedRowAtIndex(i)!;
      refreshRow(rowNode, api);
    }
    for (i = 0; i < this.gridApi.getPinnedBottomRowCount(); i++) {
      rowNode = this.gridApi.getPinnedBottomRow(i)!;
      refreshRow(rowNode, api);
    }
    function refreshRow(rowNode: RowNode, api: GridApi) {
      var millis = frame++ * 100;
      var rowNodes = [rowNode]; // params needs an array
      var params: RefreshCellsParams = {
        force: isForceRefreshSelected(),
        suppressFlash: isSuppressFlashSelected(),
        rowNodes: rowNodes,
      };
      callRefreshAfterMillis(params, millis, api);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    // placing in 13 rows, so there are exactly enough rows to fill the grid, makes
    // the row animation look nice when you see all the rows
    data = createData(14);
    topRowData = createData(2);
    bottomRowData = createData(2);
    params.api.setRowData(data);
    params.api.setPinnedTopRowData(topRowData);
    params.api.setPinnedBottomRowData(bottomRowData);
  }
}

// placing in 13 rows, so there are exactly enough rows to fill the grid, makes
// the row animation look nice when you see all the rows
var data: any[] = [];
var topRowData: any[] = [];
var bottomRowData: any[] = [];
function createData(count: number): any[] {
  var result = [];
  for (var i = 1; i <= count; i++) {
    result.push({
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return result;
}
function isForceRefreshSelected() {
  return (document.querySelector("#forceRefresh") as HTMLInputElement).checked;
}
function isSuppressFlashSelected() {
  return (document.querySelector("#suppressFlash") as HTMLInputElement).checked;
}
function callRefreshAfterMillis(
  params: RefreshCellsParams,
  millis: number,
  gridApi: GridApi
) {
  setTimeout(function () {
    gridApi.refreshCells(params);
  }, millis);
}
function scramble() {
  data.forEach(scrambleItem);
  topRowData.forEach(scrambleItem);
  bottomRowData.forEach(scrambleItem);
}
function scrambleItem(item: any) {
  ["a", "b", "c", "d", "e", "f"].forEach(function (colId) {
    // skip 50% of the cells so updates are random
    if (Math.random() > 0.5) {
      return;
    }
    item[colId] = Math.floor(Math.random() * 100);
  });
}
