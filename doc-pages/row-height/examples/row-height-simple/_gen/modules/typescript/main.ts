import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  ModuleRegistry,
  RowHeightParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'rowHeight' },
    { field: 'athlete' },
    { field: 'age', width: 80 },
    { field: 'country' },
    { field: 'year', width: 90 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],
  defaultColDef: {
    width: 150,
    sortable: true,
    resizable: true,
    filter: true,
  },
  // call back function, to tell the grid what height each row should be
  getRowHeight: getRowHeight,
};

function getRowHeight(params: RowHeightParams): number | undefined | null {
  return params.data.rowHeight;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then(function (data) {
    var differentHeights = [40, 80, 120, 200];
    data.forEach(function (dataItem: any, index: number) {
      dataItem.rowHeight = differentHeights[index % 4];
    });
    gridOptions.api!.setRowData(data);
  });
