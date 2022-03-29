import { ColDef, GridApi, GridReadyEvent } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="test-container">
    <div class="test-header">
      <div style="margin-bottom: 10px">
        <button (click)="clearFilter()">Clear Filter</button>
        <button (click)="filterUKAndIrelandBoxing()">
          UK and Ireland Boxing
        </button>
        <button (click)="filterUKAndIrelandEquestrian()">
          UK and Ireland Equestrian
        </button>
        <button (click)="filterUsaAndCanadaBoxing()">
          USA and Canada Bobsleigh
        </button>
        <button (click)="filterUsaAndCanadaEquestrian()">
          USA and Canada Equestrian
        </button>
      </div>
      <div id="title">All Medals by Country</div>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [pivotMode]="true"
      [sideBar]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "country", pivot: true, enablePivot: true },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  clearFilter() {
    this.gridApi.setFilterModel(null);
    setTitle("All Medals by Country");
  }

  filterUKAndIrelandBoxing() {
    this.gridApi.setFilterModel({
      country: {
        type: "set",
        values: ["Ireland", "Great Britain"],
      },
      sport: {
        type: "set",
        values: ["Boxing"],
      },
    });
    setTitle("UK and Ireland - Boxing");
  }

  filterUKAndIrelandEquestrian() {
    this.gridApi.setFilterModel({
      country: {
        type: "set",
        values: ["Ireland", "Great Britain"],
      },
      sport: {
        type: "set",
        values: ["Equestrian"],
      },
    });
    setTitle("UK and Ireland - Equestrian");
  }

  filterUsaAndCanadaBoxing() {
    this.gridApi.setFilterModel({
      country: {
        type: "set",
        values: ["United States", "Canada"],
      },
      sport: {
        type: "set",
        values: ["Bobsleigh"],
      },
    });
    setTitle("USA and Canada - Boxing");
  }

  filterUsaAndCanadaEquestrian() {
    this.gridApi.setFilterModel({
      country: {
        type: "set",
        values: ["United States", "Canada"],
      },
      sport: {
        type: "set",
        values: ["Equestrian"],
      },
    });
    setTitle("USA and Canada - Equestrian");
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

function setTitle(title: string) {
  (document.querySelector("#title") as any).innerText = title;
}
