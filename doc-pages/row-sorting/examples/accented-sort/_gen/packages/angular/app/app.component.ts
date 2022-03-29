import { Component } from "@angular/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [animateRows]="true"
    [sortingOrder]="sortingOrder"
    [accentedSort]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [{ field: "accented", width: 150 }];
  public defaultColDef: ColDef = {
    sortable: true,
  };
  public sortingOrder: ("asc" | "desc" | null)[] = ["desc", "asc", null];
  public rowData: any[] | null = [
    { accented: "aáàä" },
    { accented: "aàáä" },
    { accented: "aäàá" },
  ];

  onGridReady(params: GridReadyEvent) {}
}
