import {
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  IFiltersToolPanel,
  KeyCreatorParams,
  SideBarDef,
  ValueFormatterParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="printFilterModel()">Print Filter Model</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [sideBar]="sideBar"
      [rowData]="rowData"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      headerName: "Country (Complex Object)",
      field: "country",
      keyCreator: countryKeyCreator,
      valueFormatter: countryValueFormatter,
      filter: "agSetColumnFilter",
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    floatingFilter: true,
  };
  public sideBar: SideBarDef | string | boolean | null = "filters";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    (
      params.api.getToolPanelInstance("filters") as any as IFiltersToolPanel
    ).expandFilters();
  }

  printFilterModel() {
    var filterModel = this.gridApi.getFilterModel();
    console.log(filterModel);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        // hack the data, replace each country with an object of country name and code
        data.forEach(function (row: any) {
          var countryName = row.country;
          var countryCode = countryName.substring(0, 2).toUpperCase();
          row.country = {
            name: countryName,
            code: countryCode,
          };
        });
        this.rowData = data;
      });
  }
}

function countryKeyCreator(params: KeyCreatorParams) {
  var countryObject = params.value;
  return countryObject.name;
}
function countryValueFormatter(params: ValueFormatterParams) {
  return params.value.name;
}
