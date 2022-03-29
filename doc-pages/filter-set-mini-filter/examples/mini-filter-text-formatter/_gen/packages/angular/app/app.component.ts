import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

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
    // set filter
    {
      field: "athlete",
      filter: "agSetColumnFilter",
      filterParams: filterParams,
    },
    // number filters
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    resizable: true,
    floatingFilter: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

function replaceAccents(value: string) {
  return value
    .replace(new RegExp("[àáâãäå]", "g"), "a")
    .replace(new RegExp("æ", "g"), "ae")
    .replace(new RegExp("ç", "g"), "c")
    .replace(new RegExp("[èéêë]", "g"), "e")
    .replace(new RegExp("[ìíîï]", "g"), "i")
    .replace(new RegExp("ñ", "g"), "n")
    .replace(new RegExp("[òóôõøö]", "g"), "o")
    .replace(new RegExp("œ", "g"), "oe")
    .replace(new RegExp("[ùúûü]", "g"), "u")
    .replace(new RegExp("[ýÿ]", "g"), "y")
    .replace(new RegExp("\\W", "g"), "");
}
const filterParams = {
  textFormatter: replaceAccents,
};
