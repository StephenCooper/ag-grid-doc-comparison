import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  ColGroupDef,
  ColSpanParams,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

var colSpan = function (params: ColSpanParams) {
  return params.data === 2 ? 3 : 1;
};

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: 'A',
    field: 'author',
    width: 300,
    colSpan: colSpan,
  },
  {
    headerName: 'Flexed Columns',
    children: [
      {
        headerName: 'B',
        minWidth: 200,
        maxWidth: 350,
        flex: 2,
      },
      {
        headerName: 'C',
        flex: 1,
      },
    ],
  },
];

function fillAllCellsWithWidthMeasurement() {
  Array.prototype.slice
    .call(document.querySelectorAll('.ag-cell'))
    .forEach(function (cell) {
      var width = cell.offsetWidth;
      var isFullWidthRow = cell.parentElement.childNodes.length === 1;
      cell.textContent = (isFullWidthRow ? 'Total width: ' : '') + width + 'px';
    });
}

const gridOptions: GridOptions = {
  defaultColDef: {
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: [1, 2],
  onGridReady: function () {
    setInterval(fillAllCellsWithWidthMeasurement, 50);
  },
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
