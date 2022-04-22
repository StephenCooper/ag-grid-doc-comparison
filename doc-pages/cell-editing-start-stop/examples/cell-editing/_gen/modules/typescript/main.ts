import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Grid, GridOptions, ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'gender' },
    { field: 'age' },
    { field: 'mood' },
    { field: 'country' },
    { field: 'address', minWidth: 550 },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 110,
    editable: true,
    resizable: true,
  },
  rowData: getData(),
  pinnedTopRowData: getPinnedTopData(),
  pinnedBottomRowData: getPinnedBottomData(),
  onRowEditingStarted: function (event) {
    console.log('never called - not doing row editing');
  },
  onRowEditingStopped: function (event) {
    console.log('never called - not doing row editing');
  },
  onCellEditingStarted: function (event) {
    console.log('cellEditingStarted');
  },
  onCellEditingStopped: function (event) {
    console.log('cellEditingStopped');
  },
};

function getPinnedTopData() {
  return [
    {
      firstName: '##',
      lastName: '##',
      gender: '##',
      address: '##',
      mood: '##',
      country: '##',
    },
  ];
}

function getPinnedBottomData() {
  return [
    {
      firstName: '##',
      lastName: '##',
      gender: '##',
      address: '##',
      mood: '##',
      country: '##',
    },
  ];
}
function onBtStopEditing() {
  gridOptions.api!.stopEditing();
}

function onBtStartEditing(key?: string, char?: string, pinned?: string) {
  gridOptions.api!.setFocusedCell(0, 'lastName', pinned);

  gridOptions.api!.startEditingCell({
    rowIndex: 0,
    colKey: 'lastName',
    // set to 'top', 'bottom' or undefined
    rowPinned: pinned,
    key: key,
    charPress: char,
  });
}

function onBtNextCell() {
  gridOptions.api!.tabToNextCell();
}

function onBtPreviousCell() {
  gridOptions.api!.tabToPreviousCell();
}

function onBtWhich() {
  var cellDefs = gridOptions.api!.getEditingCells();
  if (cellDefs.length > 0) {
    var cellDef = cellDefs[0];
    console.log(
      'editing cell is: row = ' +
        cellDef.rowIndex +
        ', col = ' +
        cellDef.column.getId() +
        ', floating = ' +
        cellDef.rowPinned
    );
  } else {
    console.log('no cells are editing');
  }
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtStopEditing = onBtStopEditing;
  (<any>window).onBtStartEditing = onBtStartEditing;
  (<any>window).onBtNextCell = onBtNextCell;
  (<any>window).onBtPreviousCell = onBtPreviousCell;
  (<any>window).onBtWhich = onBtWhich;
}
