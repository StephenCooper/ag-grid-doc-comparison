import { ColDef, GridApi, GridReadyEvent } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `
    <div style="display: flex; flex-direction: column; height: 100%;">
      <div style="margin: 10px 0;">
        <button (click)="onBtnUpdate()">Show CSV export content text</button>
        <button (click)="onBtnExport()">Download CSV export file</button>
      </div>
      <div style="flex: 1 1 0; position: relative;">
        <div id="gridContainer">
          <ag-grid-angular
            style="width: 100%; height: 100%;"
            class="ag-theme-alpine"
            [defaultColDef]="defaultColDef"
            [suppressExcelExport]="true"
            [popupParent]="popupParent"
            [columnDefs]="columnDefs"
            [rowData]="rowData"
            (gridReady)="onGridReady($event)"
          ></ag-grid-angular>
        </div>
        <textarea id="csvResult">
Click the Show CSV export content button to view exported CSV here</textarea
        >
      </div>
    </div>
  `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    editable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };
  public popupParent: HTMLElement = document.body;
  public columnDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ];
  public rowData: any[] | null = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  onBtnUpdate() {
    (document.querySelector("#csvResult") as any).value =
      this.gridApi.getDataAsCsv();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
