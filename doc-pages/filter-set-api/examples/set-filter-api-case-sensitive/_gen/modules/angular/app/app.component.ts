import { Component } from "@angular/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
  IFiltersToolPanel,
  ISetFilter,
  SideBarDef,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div class="example-header">
      <div>
        Case Insensitive:
        <button (click)="setModel('insensitive')">
          API: setModel() - mismatching case
        </button>
        <button (click)="getModel('insensitive')">API: getModel()</button>
        <button (click)="setFilterValues('insensitive')">
          API: setFilterValues() - mismatching case
        </button>
        <button (click)="getValues('insensitive')">API: getValues()</button>
        <button (click)="reset('insensitive')">Reset</button>
      </div>
      <div style="padding-top: 10px;">
        Case Sensitive:
        <button (click)="setModel('sensitive')">
          API: setModel() - mismatching case
        </button>
        <button (click)="getModel('sensitive')">API: getModel()</button>
        <button (click)="setFilterValues('sensitive')">
          API: setFilterValues() - mismatching case
        </button>
        <button (click)="getValues('sensitive')">API: getValues()</button>
        <button (click)="reset('sensitive')">Reset</button>
      </div>
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
      headerName: "Case Insensitive (default)",
      field: "colour",
      filter: "agSetColumnFilter",
      filterParams: {
        caseSensitive: false,
        cellRenderer: colourCellRenderer,
      },
    },
    {
      headerName: "Case Sensitive",
      field: "colour",
      filter: "agSetColumnFilter",
      filterParams: {
        caseSensitive: true,
        cellRenderer: colourCellRenderer,
      },
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 225,
    cellRenderer: colourCellRenderer,
    resizable: true,
    floatingFilter: true,
  };
  public sideBar: SideBarDef | string | boolean | null = "filters";
  public rowData: any[] | null = getData();

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    (
      this.gridApi.getToolPanelInstance("filters") as any as IFiltersToolPanel
    ).expandFilters();
  }

  setModel(type: string) {
    const instance = this.gridApi.getFilterInstance(FILTER_TYPES[type])!;
    instance.setModel({ values: MANGLED_COLOURS });
    this.gridApi.onFilterChanged();
  }

  getModel(type: string) {
    const instance = this.gridApi.getFilterInstance(FILTER_TYPES[type])!;
    alert(JSON.stringify(instance.getModel(), null, 2));
  }

  setFilterValues(type: string) {
    const instance = this.gridApi.getFilterInstance(
      FILTER_TYPES[type]
    ) as ISetFilter;
    instance.setFilterValues(MANGLED_COLOURS);
    instance.applyModel();
    this.gridApi.onFilterChanged();
  }

  getValues(type: string) {
    const instance = this.gridApi.getFilterInstance(
      FILTER_TYPES[type]
    ) as ISetFilter;
    alert(JSON.stringify(instance.getValues(), null, 2));
  }

  reset(type: string) {
    const instance = this.gridApi.getFilterInstance(
      FILTER_TYPES[type]
    ) as ISetFilter;
    instance.resetFilterValues();
    instance.setModel(null);
    this.gridApi.onFilterChanged();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

var FIXED_STYLES =
  "vertical-align: middle; border: 1px solid black; margin: 3px; display: inline-block; width: 10px; height: 10px";
var FILTER_TYPES: Record<string, string> = {
  insensitive: "colour",
  sensitive: "colour_1",
};
function colourCellRenderer(params: ICellRendererParams) {
  if (!params.value || params.value === "(Select All)") {
    return params.value;
  }
  return `<div style="background-color: ${params.value.toLowerCase()}; ${FIXED_STYLES}"></div>${
    params.value
  }`;
}
var MANGLED_COLOURS = ["ReD", "OrAnGe", "WhItE", "YeLlOw"];
