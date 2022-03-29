import { Component } from "@angular/core";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  ExcelStyle,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
} from "ag-grid-community";
import { MultilineCellRenderer } from "./multiline-cell-renderer.component";

@Component({
  selector: "my-app",
  template: `<div class="container">
    <div>
      <button
        (click)="onBtExport()"
        style="margin: 5px 0px; font-weight: bold;"
      >
        Export to Excel
      </button>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowData]="rowData"
        [excelStyles]="excelStyles"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "address" },
    {
      headerName: "Custom column",
      autoHeight: true,
      valueGetter: function (param) {
        return param.data.col1 + "\n" + param.data.col2;
      },
      cellRenderer: MultilineCellRenderer,
    },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    cellClass: "multiline",
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };
  public rowData: any[] | null = [
    {
      address:
        "1197 Thunder Wagon Common,\nCataract, RI, \n02987-1016, US, \n(401) 747-0763",
      col1: "abc",
      col2: "xyz",
    },
    {
      address:
        "3685 Rocky Glade, Showtucket, NU, \nX1E-9I0, CA, \n(867) 371-4215",
      col1: "abc",
      col2: "xyz",
    },
    {
      address:
        "3235 High Forest, Glen Campbell, MS, \n39035-6845, US, \n(601) 638-8186",
      col1: "abc",
      col2: "xyz",
    },
    {
      address:
        "2234 Sleepy Pony Mall , Drain, DC, \n20078-4243, US, \n(202) 948-3634",
      col1: "abc",
      col2: "xyz",
    },
  ];
  public excelStyles: ExcelStyle[] = [
    {
      id: "multiline",
      alignment: {
        wrapText: true,
      },
    },
  ];

  onBtExport() {
    this.gridApi.exportDataAsExcel();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
