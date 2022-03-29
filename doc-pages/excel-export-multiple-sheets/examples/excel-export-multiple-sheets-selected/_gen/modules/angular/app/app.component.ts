import { ColDef, GridApi, GridReadyEvent } from "@ag-grid-community/core";
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
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowSelection]="rowSelection"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 200 },
    { field: "age" },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
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
    var spreadsheets: string[] = [];
    this.gridApi.forEachNode((node, index) => {
      if (index % 100 === 0) {
        this.gridApi.deselectAll();
      }
      node.setSelected(true);
      if (index % 100 === 99) {
        spreadsheets.push(
          this.gridApi.getSheetDataForExcel({
            onlySelected: true,
          })!
        );
      }
    });
    // check if the last page was exported
    if (this.gridApi.getSelectedNodes().length) {
      spreadsheets.push(
        this.gridApi.getSheetDataForExcel({
          onlySelected: true,
        })!
      );
      this.gridApi.deselectAll();
    }
    this.gridApi.exportMultipleSheetsAsExcel({
      data: spreadsheets,
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
