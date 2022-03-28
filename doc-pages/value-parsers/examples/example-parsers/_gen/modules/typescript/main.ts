import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { CellValueChangedEvent, ColDef, ColGroupDef, Grid, GridOptions, ValueParserParams } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

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
}

function onCellValueChanged(event: CellValueChangedEvent) {
  console.log('data after changes is: ', event.data);
}

function numberParser(params: ValueParserParams) {
  return Number(params.newValue)
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
  gridOptions.api!.sizeColumnsToFit()
 