import {
  CellValueChangedEvent,
  Grid,
  GridOptions,
  ValueParserParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const gridOptions: GridOptions = {
  columnDefs: [
    { headerName: 'Name', field: 'simple' },
    { headerName: 'Bad Number', field: 'numberBad' },
    {
      headerName: 'Good Number',
      field: 'numberGood',
      valueParser: numberParser,
    },
  ],
  defaultColDef: {
    flex: 1,
    editable: true,
    resizable: true,
  },
  rowData: getData(),
  onCellValueChanged: onCellValueChanged,
};

function onCellValueChanged(event: CellValueChangedEvent) {
  console.log('data after changes is: ', event.data);
}

function numberParser(params: ValueParserParams) {
  return Number(params.newValue);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
gridOptions.api!.sizeColumnsToFit();
