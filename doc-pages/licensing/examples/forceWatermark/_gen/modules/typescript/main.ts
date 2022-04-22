import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Grid, GridOptions, ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const gridOptions: GridOptions = {
  // define grid columns
  columnDefs: [
    // using default ColDef
    { headerName: 'Athlete', field: 'athlete' },
    { headerName: 'Sport', field: 'sport' },

    // using number column type
    { headerName: 'Age', field: 'age', type: 'numberColumn' },
    { headerName: 'Year', field: 'year', type: 'numberColumn' },

    // using date and non-editable column types
    { headerName: 'Date', field: 'date', width: 200 },
  ],

  defaultColDef: {
    width: 150,
  },

  // default ColGroupDef, get applied to every column group
  defaultColGroupDef: {
    marryChildren: true,
  },

  columnTypes: {
    numberColumn: { width: 83 },
  },

  rowData: null,

  onGridReady: function (params) {
    params.api.sizeColumnsToFit();
  },
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
