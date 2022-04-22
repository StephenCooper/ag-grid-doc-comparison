import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: 'Athlete Details',
    children: [
      {
        field: 'athlete',
        width: 180,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'age',
        width: 90,
        filter: 'agNumberColumnFilter',
      },
      { headerName: 'Country', field: 'country', width: 140 },
    ],
  },
  {
    headerName: 'Sports Results',
    children: [
      { field: 'sport', width: 140 },
      {
        columnGroupShow: 'closed',
        field: 'total',
        width: 100,
        filter: 'agNumberColumnFilter',
      },
      {
        columnGroupShow: 'open',
        field: 'gold',
        width: 100,
        filter: 'agNumberColumnFilter',
      },
      {
        columnGroupShow: 'open',
        field: 'silver',
        width: 100,
        filter: 'agNumberColumnFilter',
      },
      {
        columnGroupShow: 'open',
        field: 'bronze',
        width: 100,
        filter: 'agNumberColumnFilter',
      },
    ],
  },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    filter: true,
  },
  // debug: true,
  columnDefs: columnDefs,
  rowData: null,
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
