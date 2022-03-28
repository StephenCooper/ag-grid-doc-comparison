import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, GridReadyEvent } from 'ag-grid-community';

var rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxter', price: 72000 },
]

// let the grid know which columns and what data to use
const gridOptions: GridOptions = {
  columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],

  rowData: rowData,

  onGridReady: function (params: GridReadyEvent) {
    params.api.sizeColumnsToFit()

    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit()
      })
    })
  },
}

  var eGridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(eGridDiv, gridOptions)
  gridOptions.api!.sizeColumnsToFit()
 