import { Component } from "@angular/core";
import {
  ColDef,
  ColumnApi,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  RowDragMoveEvent,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [animateRows]="true"
    [getRowId]="getRowId"
    [rowData]="rowData"
    (sortChanged)="onSortChanged($event)"
    (filterChanged)="onFilterChanged($event)"
    (rowDragMove)="onRowDragMove($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", rowDrag: true },
    { field: "country" },
    { field: "year", width: 100 },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  public defaultColDef: ColDef = {
    width: 170,
    sortable: true,
    filter: true,
  };
  public rowData!: any[];

  // listen for change on sort changed
  onSortChanged() {
    var colState = this.gridColumnApi.getColumnState() || [];
    sortActive = colState.some((c) => c.sort);
    // suppress row drag if either sort or filter is active
    var suppressRowDrag = sortActive || filterActive;
    console.log(
      "sortActive = " +
        sortActive +
        ", filterActive = " +
        filterActive +
        ", allowRowDrag = " +
        suppressRowDrag
    );
    this.gridApi.setSuppressRowDrag(suppressRowDrag);
  }

  // listen for changes on filter changed
  onFilterChanged() {
    filterActive = this.gridApi.isAnyFilterPresent();
    // suppress row drag if either sort or filter is active
    var suppressRowDrag = sortActive || filterActive;
    console.log(
      "sortActive = " +
        sortActive +
        ", filterActive = " +
        filterActive +
        ", allowRowDrag = " +
        suppressRowDrag
    );
    this.gridApi.setSuppressRowDrag(suppressRowDrag);
  }

  onRowDragMove(event: RowDragMoveEvent) {
    var movingNode = event.node;
    var overNode = event.overNode;
    var rowNeedsToMove = movingNode !== overNode;
    if (rowNeedsToMove) {
      // the list of rows we have is data, not row nodes, so extract the data
      var movingData = movingNode.data;
      var overData = overNode!.data;
      var fromIndex = immutableStore.indexOf(movingData);
      var toIndex = immutableStore.indexOf(overData);
      var newStore = immutableStore.slice();
      moveInArray(newStore, fromIndex, toIndex);
      immutableStore = newStore;
      this.gridApi.setRowData(newStore);
      this.gridApi.clearFocusedCell();
    }
    function moveInArray(arr: any[], fromIndex: number, toIndex: number) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // add id to each item, needed for immutable store to work
    immutableStore.forEach(function (data, index) {
      data.id = index;
    });
    params.api!.setRowData(immutableStore);
  }

  getRowId(params: GetRowIdParams) {
    return params.data.id;
  }
}

var immutableStore: any[] = getData();
var sortActive = false;
var filterActive = false;
