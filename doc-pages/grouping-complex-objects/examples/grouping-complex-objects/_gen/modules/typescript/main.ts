import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, KeyCreatorParams, ValueGetterParams } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
    { field: 'age' },
    {
      field: 'country',
      rowGroup: true,
      hide: true,
      valueGetter: countryValueGetter,
      keyCreator: countryKeyCreator,
    },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport', minWidth: 200 },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 200,
  },
}

function countryKeyCreator(params: KeyCreatorParams) {
  var countryObject = params.value
  return countryObject.name
}

function countryValueGetter(params: ValueGetterParams) {
  // hack the data  - replace the country with an object of country name and code
  var countryName = params.data.country
  var countryCode = countryName.substring(0, 2).toUpperCase()
  return {
    name: countryName,
    code: countryCode,
  }
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 