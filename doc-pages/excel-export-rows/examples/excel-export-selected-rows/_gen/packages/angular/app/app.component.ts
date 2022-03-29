import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<div class="container">
    <div class="columns">
      <label class="option" for="selectedOnly"
        ><input id="selectedOnly" type="checkbox" />Selected Rows Only</label
      >
      <div>
        <button (click)="onBtExport()" style="font-weight: bold;">
          Export to Excel
        </button>
      </div>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [suppressRowClickSelection]="true"
        [rowSelection]="rowSelection"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { checkboxSelection: true, field: "athlete", minWidth: 200 },
    { field: "country", minWidth: 200 },
    { headerName: "Group", valueGetter: "data.country.charAt(0)" },
    { field: "sport", minWidth: 150 },
    { field: "gold", hide: true },
    { field: "silver", hide: true },
    { field: "bronze", hide: true },
    { field: "total", hide: true },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };
  public rowSelection = "multiple";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExport() {
    this.gridApi.exportDataAsExcel({
      onlySelected: (
        document.querySelector("#selectedOnly") as HTMLInputElement
      ).checked,
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    (document.getElementById("selectedOnly") as HTMLInputElement).checked =
      true;

    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/small-olympic-winners.json"
      )
      .subscribe((data) =>
        params.api!.setRowData(data.filter((rec: any) => rec.country != null))
      );
  }
}
