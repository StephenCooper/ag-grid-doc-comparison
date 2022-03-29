import {
  ColDef,
  CsvCell,
  CsvExportParams,
  ExcelCell,
  ExcelExportParams,
  ExcelStyle,
  GridApi,
  GridReadyEvent,
  IDetailCellRendererParams,
  ProcessRowGroupForExportParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="container">
    <div>
      <button
        (click)="onBtExport()"
        style="margin-bottom: 5px; font-weight: bold;"
      >
        Export to Excel
      </button>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [defaultCsvExportParams]="defaultCsvExportParams"
        [defaultExcelExportParams]="defaultExcelExportParams"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [masterDetail]="true"
        [detailCellRendererParams]="detailCellRendererParams"
        [excelStyles]="excelStyles"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public defaultCsvExportParams: CsvExportParams = {
    getCustomContentBelowRow: (params) => getCells(params) as CsvCell[][],
  };
  public defaultExcelExportParams: ExcelExportParams = {
    getCustomContentBelowRow: (params) => getCells(params),
    columnWidth: 120,
  };
  public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: "name", cellRenderer: "agGroupCellRenderer" },
    { field: "account" },
    { field: "calls" },
    { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public detailCellRendererParams: any = {
    detailGridOptions: {
      columnDefs: [
        { field: "callId" },
        { field: "direction" },
        { field: "number", minWidth: 150 },
        { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
        { field: "switchCode", minWidth: 150 },
      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: function (params) {
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams;
  public excelStyles: ExcelStyle[] = [
    {
      id: "header",
      interior: {
        color: "#aaaaaa",
        pattern: "Solid",
      },
    },
    {
      id: "body",
      interior: {
        color: "#dddddd",
        pattern: "Solid",
      },
    },
  ];
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExport() {
    this.gridApi.exportDataAsExcel();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/master-detail-data.json"
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}

var getCells = (params: ProcessRowGroupForExportParams) => {
  const cells: ExcelCell[][] = [
    [
      cell(""),
      cell("Call Id", "header"),
      cell("Direction", "header"),
      cell("Number", "header"),
      cell("Duration", "header"),
      cell("Switch Code", "header"),
    ],
  ].concat(
    params.node.data.callRecords.map(function (record: any) {
      return [
        cell(""),
        cell(record.callId, "body"),
        cell(record.direction, "body"),
        cell(record.number, "body"),
        cell(record.duration, "body"),
        cell(record.switchCode, "body"),
      ];
    }),
    [[]]
  );
  return cells;
};
function cell(text: string, styleId?: string): ExcelCell {
  return {
    styleId: styleId,
    data: {
      type: /^\d+$/.test(text) ? "Number" : "String",
      value: String(text),
    },
  };
}
