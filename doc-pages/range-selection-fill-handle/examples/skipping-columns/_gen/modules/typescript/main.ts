import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  FillOperationParams,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RangeSelectionModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    editable: true,
  },
  enableRangeSelection: true,
  enableFillHandle: true,
  suppressClearOnFillReduction: true,
  fillOperation: function (params: FillOperationParams) {
    if (params.column.getColId() === 'country') {
      return params.currentCellValue;
    }

    return params.values[params.values.length - 1];
  },
};

function createRowData(data: any[]) {
  var rowData = data.slice(0, 100);
  return rowData;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then(function (data) {
    gridOptions.api!.setRowData(createRowData(data));
  });
