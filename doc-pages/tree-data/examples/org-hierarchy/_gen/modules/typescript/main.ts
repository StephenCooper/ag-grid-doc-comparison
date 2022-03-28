import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, GetDataPath, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])

const gridOptions: GridOptions = {
  columnDefs: [
    // we're using the auto group column by default!
    { field: 'jobTitle' },
    { field: 'employmentType' },
  ],
  defaultColDef: {
    flex: 1,
  },
  autoGroupColumnDef: {
    headerName: 'Organisation Hierarchy',
    minWidth: 300,
    cellRendererParams: {
      suppressCount: true,
    },
  },
  rowData: getData(),
  treeData: true, // enable Tree Data mode
  animateRows: true,
  groupDefaultExpanded: -1, // expand all groups by default
  getDataPath: function (data) {
    return data.orgHierarchy
  },
}

function onFilterTextBoxChanged() {
  gridOptions.api!.setQuickFilter(
    (document.getElementById('filter-text-box') as any).value
  )
}

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
  // lookup the container we want the Grid to use
  var eGridDiv = document.querySelector<HTMLElement>('#myGrid')!

  // create the grid passing in the div to use together with the columns & data we want to use
  new Grid(eGridDiv, gridOptions)
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onFilterTextBoxChanged = onFilterTextBoxChanged;
}