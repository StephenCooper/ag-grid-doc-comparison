import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  StatusBarModule,
  RangeSelectionModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete', minWidth: 200 },
    { field: 'age' },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'date', minWidth: 180 },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  onFirstDataRendered: onFirstDataRendered,
  enableRangeSelection: true,
  statusBar: {
    statusPanels: [
      {
        statusPanel: 'agAggregationComponent',
        statusPanelParams: {
          // possible values are: 'count', 'sum', 'min', 'max', 'avg'
          aggFuncs: ['sum', 'avg'],
        },
      },
    ],
  },
};

function onFirstDataRendered(event: FirstDataRenderedEvent) {
  event.api.addCellRange({
    rowStartIndex: 3,
    rowEndIndex: 8,
    columns: ['age'],
  });
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
