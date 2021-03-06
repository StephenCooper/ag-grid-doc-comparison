import { Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { DragSourceRenderer } from './dragSourceRenderer';

var rowClassRules = {
  'red-row': 'data.color == "Red"',
  'green-row': 'data.color == "Green"',
  'blue-row': 'data.color == "Blue"',
};

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
  },
  rowClassRules: rowClassRules,
  rowData: getData(),
  rowDragManaged: true,
  columnDefs: [
    { cellRenderer: DragSourceRenderer, minWidth: 100 },
    { field: 'id' },
    { field: 'color' },
    { field: 'value1' },
    { field: 'value2' },
  ],
  animateRows: true,
};

function onDragOver(event: any) {
  var types = event.dataTransfer.types;

  var dragSupported = types.length;

  if (dragSupported) {
    event.dataTransfer.dropEffect = 'move';
  }

  event.preventDefault();
}

function onDrop(event: any) {
  event.preventDefault();

  var textData = event.dataTransfer.getData('text/plain');
  var eJsonRow = document.createElement('div');
  eJsonRow.classList.add('json-row');
  eJsonRow.innerText = textData;

  var eJsonDisplay = document.querySelector('#eJsonDisplay')!;
  eJsonDisplay.appendChild(eJsonRow);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onDragOver = onDragOver;
  (<any>window).onDrop = onDrop;
}
