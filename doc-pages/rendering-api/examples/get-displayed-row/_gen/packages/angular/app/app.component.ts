import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="getDisplayedRowAtIndex()">Get Displayed Row 0</button>
      <button (click)="getDisplayedRowCount()">Get Displayed Row Count</button>
      <button (click)="printAllDisplayedRows()">
        Print All Displayed Rows
      </button>
      <button (click)="printPageDisplayedRows()">
        Print Page Displayed Rows
      </button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [pagination]="true"
      [paginationAutoPageSize]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 180 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { headerName: "Group", valueGetter: "data.country.charAt(0)" },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 180 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  getDisplayedRowAtIndex() {
    var rowNode = this.gridApi.getDisplayedRowAtIndex(0)!;
    console.log(
      "getDisplayedRowAtIndex(0) => " +
        rowNode.data.athlete +
        " " +
        rowNode.data.year
    );
  }

  getDisplayedRowCount() {
    var count = this.gridApi.getDisplayedRowCount();
    console.log("getDisplayedRowCount() => " + count);
  }

  printAllDisplayedRows() {
    var count = this.gridApi.getDisplayedRowCount();
    console.log("## printAllDisplayedRows");
    for (var i = 0; i < count; i++) {
      var rowNode = this.gridApi.getDisplayedRowAtIndex(i)!;
      console.log("row " + i + " is " + rowNode.data.athlete);
    }
  }

  printPageDisplayedRows() {
    var rowCount = this.gridApi.getDisplayedRowCount();
    var lastGridIndex = rowCount - 1;
    var currentPage = this.gridApi.paginationGetCurrentPage();
    var pageSize = this.gridApi.paginationGetPageSize();
    var startPageIndex = currentPage * pageSize;
    var endPageIndex = (currentPage + 1) * pageSize - 1;
    if (endPageIndex > lastGridIndex) {
      endPageIndex = lastGridIndex;
    }
    console.log("## printPageDisplayedRows");
    for (var i = startPageIndex; i <= endPageIndex; i++) {
      var rowNode = this.gridApi.getDisplayedRowAtIndex(i)!;
      console.log("row " + i + " is " + rowNode.data.athlete);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        params.api!.setRowData(data.slice(0, 100));
      });
  }
}
