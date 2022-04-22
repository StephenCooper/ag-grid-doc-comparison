import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  CellClassRules,
  ColDef,
  ColSpanParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  RowHeightParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

var cellClassRules: CellClassRules = {
  'header-cell': 'data.section === "big-title"',
  'quarters-cell': 'data.section === "quarters"',
};

const columnDefs: ColDef[] = [
  {
    headerName: 'Jan',
    field: 'jan',
    colSpan: function (params: ColSpanParams) {
      if (isHeaderRow(params)) {
        return 6;
      } else if (isQuarterRow(params)) {
        return 3;
      } else {
        return 1;
      }
    },
    cellClassRules: cellClassRules,
  },
  { headerName: 'Feb', field: 'feb' },
  { headerName: 'Mar', field: 'mar' },
  {
    headerName: 'Apr',
    field: 'apr',
    colSpan: function (params: ColSpanParams) {
      if (isQuarterRow(params)) {
        return 3;
      } else {
        return 1;
      }
    },
    cellClassRules: cellClassRules,
  },
  { headerName: 'May', field: 'may' },
  { headerName: 'Jun', field: 'jun' },
];

const gridOptions: GridOptions = {
  getRowHeight: function (params: RowHeightParams) {
    if (isHeaderRow(params)) {
      return 60;
    }
  },
  columnDefs: columnDefs,
  rowData: getData(),
  defaultColDef: {
    width: 100,
  },
  onGridReady: function (params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  },
};

function isHeaderRow(params: RowHeightParams | ColSpanParams) {
  return params.data.section === 'big-title';
}

function isQuarterRow(params: ColSpanParams) {
  return params.data.section === 'quarters';
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
