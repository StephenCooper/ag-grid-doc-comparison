import { ColDef, GridReadyEvent } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { YearFilter } from "./year-filter.component";
import { YearFloatingFilter } from "./year-floating-filter.component";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete", filter: "agMultiColumnFilter" },
    { field: "sport", filter: "agMultiColumnFilter" },
    {
      field: "year",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: YearFilter,
            floatingFilterComponent: YearFloatingFilter,
          },
          {
            filter: "agNumberColumnFilter",
          },
        ],
      },
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    resizable: true,
    floatingFilter: true,
    menuTabs: ["filterMenuTab"],
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
