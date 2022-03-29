import { Component } from "@angular/core";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  ExcelExportParams,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";
declare var logos: any;

@Component({
  selector: "my-app",
  template: `<div class="container">
    <div>
      <button class="export" (click)="onBtExport()">Export to Excel</button>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [defaultExcelExportParams]="defaultExcelExportParams"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete" },
    { field: "country" },
    { field: "age" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    width: 150,
    resizable: true,
  };
  public defaultExcelExportParams: ExcelExportParams = {
    prependContent: [
      [
        {
          data: {
            type: "String",
            value: logos.AgGrid, // see imageUtils
          },
          mergeAcross: 1,
        },
      ],
    ],
    rowHeight: (params) => (params.rowIndex === 1 ? 82 : 20),
    addImageToCell: (rowIndex, col, value) => {
      if (rowIndex !== 1 || col.getColId() !== "athlete") {
        return;
      }
      return {
        image: {
          id: "logo",
          base64: value,
          imageType: "png",
          width: 295,
          height: 100,
          position: {
            colSpan: 2,
          },
        },
      };
    },
  };
  public rowData!: any[];

  onBtExport() {
    this.gridApi.exportDataAsExcel();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
      .then((response) => response.json())
      .then((data) => params.api.setRowData(data));
  }
}
