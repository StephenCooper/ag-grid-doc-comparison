import {
  ColDef,
  GridReadyEvent,
  KeyCreatorParams,
  SideBarDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [sideBar]="sideBar"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: "Animals (array)",
      field: "animalsArray",
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Animals (string)",
      filter: "agSetColumnFilter",
      valueGetter: valueGetter,
    },
    {
      headerName: "Animals (objects)",
      field: "animalsObjects",
      filter: "agSetColumnFilter",
      valueFormatter: valueFormatter,
      keyCreator: keyCreator,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public rowData: any[] | null = getData();
  public sideBar: SideBarDef | string | boolean | null = "filters";

  onGridReady(params: GridReadyEvent) {}
}

var valueGetter = function (params: ValueGetterParams) {
  return params.data["animalsString"].split("|");
};
var valueFormatter = function (params: ValueFormatterParams) {
  return params.value
    .map(function (animal: any) {
      return animal.name;
    })
    .join(", ");
};
var keyCreator = function (params: KeyCreatorParams) {
  return params.value.map(function (animal: any) {
    return animal.name;
  });
};
