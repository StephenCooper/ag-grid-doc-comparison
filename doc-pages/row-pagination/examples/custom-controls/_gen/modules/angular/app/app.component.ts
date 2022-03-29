import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ValueFormatterParams,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div class="example-header">
      <div>
        <button (click)="onBtFirst()">To First</button>
        <button (click)="onBtLast()" id="btLast">To Last</button>
        <button (click)="onBtPrevious()">To Previous</button>
        <button (click)="onBtNext()">To Next</button>
        <button (click)="onBtPageFive()">To Page 5</button>
        <button (click)="onBtPageFifty()">To Page 50</button>
      </div>

      <div style="margin-top: 6px">
        <span class="label">Last Page Found:</span>
        <span class="value" id="lbLastPageFound">-</span>
        <span class="label">Page Size:</span>
        <span class="value" id="lbPageSize">-</span>
        <span class="label">Total Pages:</span>
        <span class="value" id="lbTotalPages">-</span>
        <span class="label">Current Page:</span>
        <span class="value" id="lbCurrentPage">-</span>
      </div>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowSelection]="rowSelection"
      [paginationPageSize]="paginationPageSize"
      [pagination]="true"
      [suppressPaginationPanel]="true"
      [suppressScrollOnNewData]="true"
      [rowData]="rowData"
      (paginationChanged)="onPaginationChanged($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    // this row just shows the row index, doesn't use any data from the row
    {
      headerName: "#",
      width: 50,
      valueFormatter: function (params: ValueFormatterParams) {
        return `${parseInt(params.node!.id!) + 1}`;
      },
    },
    { headerName: "Athlete", field: "athlete", width: 150 },
    { headerName: "Age", field: "age", width: 90 },
    { headerName: "Country", field: "country", width: 120 },
    { headerName: "Year", field: "year", width: 90 },
    { headerName: "Date", field: "date", width: 110 },
    { headerName: "Sport", field: "sport", width: 110 },
    { headerName: "Gold", field: "gold", width: 100 },
    { headerName: "Silver", field: "silver", width: 100 },
    { headerName: "Bronze", field: "bronze", width: 100 },
    { headerName: "Total", field: "total", width: 100 },
  ];
  public defaultColDef: ColDef = {
    resizable: true,
    filter: true,
  };
  public rowSelection = "multiple";
  public paginationPageSize = 500;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onPaginationChanged() {
    console.log("onPaginationPageLoaded");
    // Workaround for bug in events order
    if (this.gridApi!) {
      setText("#lbLastPageFound", this.gridApi.paginationIsLastPageFound());
      setText("#lbPageSize", this.gridApi.paginationGetPageSize());
      // we +1 to current page, as pages are zero based
      setText("#lbCurrentPage", this.gridApi.paginationGetCurrentPage() + 1);
      setText("#lbTotalPages", this.gridApi.paginationGetTotalPages());
      setLastButtonDisabled(!this.gridApi.paginationIsLastPageFound());
    }
  }

  onBtFirst() {
    this.gridApi.paginationGoToFirstPage();
  }

  onBtLast() {
    this.gridApi.paginationGoToLastPage();
  }

  onBtNext() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.gridApi.paginationGoToPreviousPage();
  }

  onBtPageFive() {
    // we say page 4, as the first page is zero
    this.gridApi.paginationGoToPage(4);
  }

  onBtPageFifty() {
    // we say page 49, as the first page is zero
    this.gridApi.paginationGoToPage(49);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

function setText(selector: string, text: any) {
  (document.querySelector(selector) as any).innerHTML = text;
}
function setLastButtonDisabled(disabled: boolean) {
  (document.querySelector("#btLast") as any).disabled = disabled;
}
