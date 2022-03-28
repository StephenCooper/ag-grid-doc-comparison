import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, GetRowIdFunc, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

var rowData = [
  { id: 'aa', make: 'Toyota', model: 'Celica', price: 35000 },
  { id: 'bb', make: 'Ford', model: 'Mondeo', price: 32000 },
  { id: 'cc', make: 'Porsche', model: 'Boxter', price: 72000 },
  { id: 'dd', make: 'BMW', model: '5 Series', price: 59000 },
  { id: 'ee', make: 'Dodge', model: 'Challanger', price: 35000 },
  { id: 'ff', make: 'Mazda', model: 'MX5', price: 28000 },
  { id: 'gg', make: 'Horse', model: 'Outside', price: 99000 },
]

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'make' },
    { field: 'model' },
    { field: 'price', filter: 'agNumberColumnFilter' },
  ],
  defaultColDef: {
    flex: 1,
    editable: true,
    sortable: true,
    filter: true,
  },
  animateRows: true,
  getRowId: function (params) {
    return params.data.id
  },
  rowData: rowData,
}

function updateSort() {
  gridOptions.api!.refreshClientSideRowModel('sort')
}

function updateFilter() {
  gridOptions.api!.refreshClientSideRowModel('filter')
}

function setPriceOnToyota() {
  var rowNode = gridOptions.api!.getRowNode('aa')!
  var newPrice = Math.floor(Math.random() * 100000)
  rowNode.setDataValue('price', newPrice)
}

function setDataOnFord() {
  var rowNode = gridOptions.api!.getRowNode('bb')!
  var newPrice = Math.floor(Math.random() * 100000)
  var newModel = 'T-' + Math.floor(Math.random() * 1000)
  var newData = {
    id: 'bb',
    make: 'Ford',
    model: newModel,
    price: newPrice,
  }
  rowNode.setData(newData)
}

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
  var eGridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(eGridDiv, gridOptions)
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).updateSort = updateSort;
 (<any>window).updateFilter = updateFilter;
 (<any>window).setPriceOnToyota = setPriceOnToyota;
 (<any>window).setDataOnFord = setDataOnFord;
}