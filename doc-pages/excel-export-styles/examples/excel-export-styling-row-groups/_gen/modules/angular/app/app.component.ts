import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  CellClassParams,
  ColDef,
  ColGroupDef,
  ColumnApi,
  ExcelStyle,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ProcessRowGroupForExportParams,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: ` <div class="page-wrapper">
    <div>
      <button
        (click)="onBtnExportDataAsExcel()"
        style="margin-bottom: 5px; font-weight: bold;"
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
        [autoGroupColumnDef]="autoGroupColumnDef"
        [excelStyles]="excelStyles"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "country", minWidth: 120, rowGroup: true },
    { field: "year", rowGroup: true },
    { headerName: "Name", field: "athlete", minWidth: 150 },
    {
      headerName: "Name Length",
      valueGetter: 'data ? data.athlete.length : ""',
    },
    { field: "sport", minWidth: 120, rowGroup: true },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };
  public autoGroupColumnDef: ColDef = {
    cellClass: getIndentClass,
    minWidth: 250,
    flex: 1,
  };
  public excelStyles: ExcelStyle[] = [
    {
      id: "indent-1",
      alignment: {
        indent: 1,
      },
      // note, dataType: 'string' required to ensure that numeric values aren't right-aligned
      dataType: "String",
    },
    {
      id: "indent-2",
      alignment: {
        indent: 2,
      },
      dataType: "String",
    },
    {
      id: "indent-3",
      alignment: {
        indent: 3,
      },
      dataType: "String",
    },
  ];
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtnExportDataAsExcel() {
    this.gridApi.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        this.rowData = data;
        params.api!.forEachNode(function (node) {
          node.expanded = true;
        });
        params.api!.onGroupExpandedOrCollapsed();
      });
  }
}

function rowGroupCallback(params: ProcessRowGroupForExportParams) {
  return params.node.key!;
}
function getIndentClass(params: CellClassParams) {
  var indent = 0;
  var node = params.node;
  while (node && node.parent) {
    indent++;
    node = node.parent;
  }
  return "indent-" + indent;
}
