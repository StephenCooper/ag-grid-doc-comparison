import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    resizable: true,
  },
  rowData: getData(),
}

function expandAll() {
  gridOptions.api!.expandAll()
}

function collapseAll() {
  gridOptions.api!.collapseAll()
}

function expandCountries() {
  gridOptions.api!.forEachNode(node => {
    if (node.level === 0) {
      node.setExpanded(true)
    }
  })
}

function expand2000() {
  gridOptions.api!.forEachNode(node => {
    if (node.key === '2000') {
      node.parent!.setExpanded(true) // ensure parent 'country' group is also expanded
      node.setExpanded(true)
    }
  })
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).expandAll = expandAll;
 (<any>window).collapseAll = collapseAll;
 (<any>window).expandCountries = expandCountries;
 (<any>window).expand2000 = expand2000;
}