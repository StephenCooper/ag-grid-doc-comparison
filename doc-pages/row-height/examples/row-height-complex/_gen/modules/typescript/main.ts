import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Grid, GridOptions, ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'latinText', width: 350, wrapText: true },
    { field: 'athlete' },
    { field: 'country' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],
  rowHeight: 120,
  defaultColDef: {
    width: 170,
    sortable: true,
    editable: true,
    resizable: true,
    filter: true,
  },
};
var latinText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then(function (data) {
    data.forEach(function (dataItem: any) {
      dataItem.latinText = latinText;
    });

    // now set the data into the grid
    gridOptions.api!.setRowData(data);
  });
