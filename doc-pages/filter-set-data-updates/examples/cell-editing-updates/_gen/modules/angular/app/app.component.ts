import {
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="reset()">Reset</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [sideBar]="sideBar"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public rowData: any[] | null = getRowData();
  public columnDefs: ColDef[] = [
    {
      headerName: 'Set Filter Column',
      field: 'col1',
      filter: 'agSetColumnFilter',
      flex: 1,
      editable: true,
    },
  ];
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }

  reset() {
    this.gridApi.setFilterModel(null);
    this.gridApi.setRowData(getRowData());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

function getRowData() {
  return [
    { col1: 'A' },
    { col1: 'A' },
    { col1: 'B' },
    { col1: 'B' },
    { col1: 'C' },
    { col1: 'C' },
  ];
}
