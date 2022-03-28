import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, SideBarDef } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, ColumnsToolPanelModule])

const columnDefs: ColDef[] = [
  {
    field: 'athlete',
    minWidth: 200,
    enableRowGroup: true,
    enablePivot: true,
  },
  {
    field: 'age',
    enableValue: true,
  },
  {
    field: 'country',
    minWidth: 200,
    enableRowGroup: true,
    enablePivot: true,
    rowGroupIndex: 1,
  },
  {
    field: 'year',
    enableRowGroup: true,
    enablePivot: true,
    pivotIndex: 1,
  },
  {
    field: 'date',
    minWidth: 180,
    enableRowGroup: true,
    enablePivot: true,
  },
  {
    field: 'sport',
    minWidth: 200,
    enableRowGroup: true,
    enablePivot: true,
    rowGroupIndex: 2,
  },
  {
    field: 'gold',
    hide: true,
    enableValue: true,
  },
  {
    field: 'silver',
    hide: true,
    enableValue: true,
    aggFunc: 'sum',
  },
  {
    field: 'bronze',
    hide: true,
    enableValue: true,
    aggFunc: 'sum',
  },
  {
    headerName: 'Total',
    field: 'totalAgg',
    valueGetter:
      'node.group ? data.totalAgg : data.gold + data.silver + data.bronze',
  },
]

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 250,
  },
  pivotMode: true,
  sideBar: 'columns',
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always',
  functionsReadOnly: true,
  onGridReady: function () {
    (document.getElementById('read-only') as HTMLInputElement).checked = true;
  }
}

function setReadOnly() {
  gridOptions.api!.setFunctionsReadOnly(
    (document.getElementById('read-only') as HTMLInputElement).checked
  )
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).setReadOnly = setReadOnly;
}