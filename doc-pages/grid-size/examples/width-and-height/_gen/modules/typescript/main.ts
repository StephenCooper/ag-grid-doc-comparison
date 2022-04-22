import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Grid, GridOptions, ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

var gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete', width: 150 },
    { field: 'age', width: 90 },
    { field: 'country', width: 150 },
    { field: 'year', width: 90 },
    { field: 'date', width: 150 },
    { field: 'sport', width: 150 },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100 },
  ],
};

function fillLarge() {
  setWidthAndHeight('100%');
}

function fillMedium() {
  setWidthAndHeight('60%');
}

function fillExact() {
  setWidthAndHeight('400px');
}

function setWidthAndHeight(size: string) {
  var eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
  eGridDiv.style.setProperty('width', size);
  eGridDiv.style.setProperty('height', size);
}

var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).fillLarge = fillLarge;
  (<any>window).fillMedium = fillMedium;
  (<any>window).fillExact = fillExact;
}
