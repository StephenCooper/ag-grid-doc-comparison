import { Component } from '@angular/core';
import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
  ICellRendererParams,
  IFiltersToolPanel,
  SideBarDef,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div style="display: flex; flex-direction: column; height: 100%;">
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
  public columnDefs: ColDef[] = [
    {
      headerName: 'Case Insensitive (default)',
      field: 'colour',
      filter: 'agSetColumnFilter',
      filterParams: {
        caseSensitive: false,
        cellRenderer: colourCellRenderer,
      },
    },
    {
      headerName: 'Case Sensitive',
      field: 'colour',
      filter: 'agSetColumnFilter',
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
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
  public rowData: any[] | null = getData();

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }

  onGridReady(params: GridReadyEvent) {}
}

const FIXED_STYLES =
  'vertical-align: middle; border: 1px solid black; margin: 3px; display: inline-block; width: 10px; height: 10px';
function colourCellRenderer(params: ICellRendererParams) {
  if (!params.value || params.value === '(Select All)') {
    return params.value;
  }
  return `<div style="background-color: ${params.value.toLowerCase()}; ${FIXED_STYLES}"></div>${
    params.value
  }`;
}
