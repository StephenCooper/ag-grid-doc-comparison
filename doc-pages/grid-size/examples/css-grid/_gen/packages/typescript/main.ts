import { Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

var rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxster', price: 72000 },
];

// let the grid know which columns and what data to use
const gridOptions: GridOptions = {
  columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
  rowData: rowData,
  onGridReady: (params) => {
    params.api.sizeColumnsToFit();

    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
  },
};

var eGridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(eGridDiv, gridOptions);
gridOptions.api!.sizeColumnsToFit();
