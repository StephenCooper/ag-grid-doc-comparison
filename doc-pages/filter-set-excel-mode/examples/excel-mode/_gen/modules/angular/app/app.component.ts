import { ColDef, GridReadyEvent, SideBarDef } from "@ag-grid-community/core";
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
    [sideBar]="sideBar"
    [rowData]="rowData"
    [localeText]="localeText"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: "Default",
      field: "animal",
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Excel (Windows)",
      field: "animal",
      filter: "agSetColumnFilter",
      filterParams: {
        excelMode: "windows",
      },
    },
    {
      headerName: "Excel (Mac)",
      field: "animal",
      filter: "agSetColumnFilter",
      filterParams: {
        excelMode: "mac",
      },
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    resizable: true,
  };
  public sideBar: SideBarDef | string | boolean | null = "filters";
  public rowData: any[] | null = getData();
  public localeText: {
    [key: string]: string;
  } = {
    applyFilter: "OK",
    cancelFilter: "Cancel",
    resetFilter: "Clear Filter",
  };

  onGridReady(params: GridReadyEvent) {}
}
