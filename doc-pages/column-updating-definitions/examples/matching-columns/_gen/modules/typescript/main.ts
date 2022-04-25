import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  ModuleRegistry,
  ValueGetterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const athleteColumn = {
  headerName: 'Athlete',
  valueGetter: (params: ValueGetterParams) => {
    return params.data.athlete;
  },
};

function getColDefsMedalsIncluded() {
  return [
    athleteColumn,
    {
      colId: 'myAgeCol',
      headerName: 'Age',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.age;
      },
    },
    {
      headerName: 'Country',
      headerClass: 'country-header',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.country;
      },
    },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
}

function getColDefsMedalsExcluded() {
  return [
    athleteColumn,
    {
      colId: 'myAgeCol',
      headerName: 'Age',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.age;
      },
    },
    {
      headerName: 'Country',
      headerClass: 'country-header',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.country;
      },
    },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
  ];
}

const gridOptions: GridOptions = {
  defaultColDef: {
    initialWidth: 100,
    sortable: true,
    resizable: true,
  },
  columnDefs: getColDefsMedalsIncluded(),
};

function onBtExcludeMedalColumns() {
  gridOptions.api!.setColumnDefs(getColDefsMedalsExcluded());
}

function onBtIncludeMedalColumns() {
  gridOptions.api!.setColumnDefs(getColDefsMedalsIncluded());
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtExcludeMedalColumns = onBtExcludeMedalColumns;
  (<any>window).onBtIncludeMedalColumns = onBtIncludeMedalColumns;
}
