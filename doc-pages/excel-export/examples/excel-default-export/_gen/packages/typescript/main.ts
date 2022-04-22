import { Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: 'Group A',
      children: [
        { field: 'athlete', minWidth: 200 },
        { field: 'country', minWidth: 200 },
      ],
    },
    {
      headerName: 'Group B',
      children: [
        { field: 'sport', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
    },
  ],
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },
};

function onBtExport() {
  gridOptions.api!.exportDataAsExcel();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
  .then((response) => response.json())
  .then(function (data) {
    gridOptions.api!.setRowData(data);
  });

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtExport = onBtExport;
}
