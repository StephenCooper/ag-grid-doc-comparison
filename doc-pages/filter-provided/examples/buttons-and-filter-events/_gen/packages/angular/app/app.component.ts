import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  FilterChangedEvent,
  FilterModifiedEvent,
  FilterOpenedEvent,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IProvidedFilter,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (filterOpened)="onFilterOpened($event)"
    (filterChanged)="onFilterChanged($event)"
    (filterModified)="onFilterModified($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: "athlete",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
      },
    },
    {
      field: "age",
      maxWidth: 100,
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
    },
    {
      field: "country",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["clear", "apply"],
      },
    },
    {
      field: "year",
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["apply", "cancel"],
        closeOnApply: true,
      },
      maxWidth: 100,
    },
    { field: "sport" },
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
    { field: "total", filter: "agNumberColumnFilter" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFilterOpened(e: FilterOpenedEvent) {
    console.log("onFilterOpened", e);
  }

  onFilterChanged(e: FilterChangedEvent) {
    console.log("onFilterChanged", e);
    console.log("gridApi.getFilterModel() =>", e.api.getFilterModel());
  }

  onFilterModified(e: FilterModifiedEvent) {
    console.log("onFilterModified", e);
    console.log("filterInstance.getModel() =>", e.filterInstance.getModel());
    console.log(
      "filterInstance.getModelFromUi() =>",
      (e.filterInstance as unknown as IProvidedFilter).getModelFromUi()
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
