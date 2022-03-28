import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, SideBarDef } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, MenuModule])

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', pivot: true, enablePivot: true },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
  },
  pivotMode: true,
  sideBar: true,
}

function setTitle(title: string) {
   (document.querySelector('#title') as any).innerText = title
}

function clearFilter() {
  gridOptions.api!.setFilterModel(null)
  setTitle('All Medals by Country')
}

function filterUKAndIrelandBoxing() {
  gridOptions.api!.setFilterModel({
    country: {
      type: 'set',
      values: ['Ireland', 'Great Britain'],
    },
    sport: {
      type: 'set',
      values: ['Boxing'],
    },
  })
  setTitle('UK and Ireland - Boxing')
}

function filterUKAndIrelandEquestrian() {
  gridOptions.api!.setFilterModel({
    country: {
      type: 'set',
      values: ['Ireland', 'Great Britain'],
    },
    sport: {
      type: 'set',
      values: ['Equestrian'],
    },
  })
  setTitle('UK and Ireland - Equestrian')
}

function filterUsaAndCanadaBoxing() {
  gridOptions.api!.setFilterModel({
    country: {
      type: 'set',
      values: ['United States', 'Canada'],
    },
    sport: {
      type: 'set',
      values: ['Bobsleigh'],
    },
  })
  setTitle('USA and Canada - Boxing')
}

function filterUsaAndCanadaEquestrian() {
  gridOptions.api!.setFilterModel({
    country: {
      type: 'set',
      values: ['United States', 'Canada'],
    },
    sport: {
      type: 'set',
      values: ['Equestrian'],
    },
  })
  setTitle('USA and Canada - Equestrian')
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).clearFilter = clearFilter;
 (<any>window).filterUKAndIrelandBoxing = filterUKAndIrelandBoxing;
 (<any>window).filterUKAndIrelandEquestrian = filterUKAndIrelandEquestrian;
 (<any>window).filterUsaAndCanadaBoxing = filterUsaAndCanadaBoxing;
 (<any>window).filterUsaAndCanadaEquestrian = filterUsaAndCanadaEquestrian;
}