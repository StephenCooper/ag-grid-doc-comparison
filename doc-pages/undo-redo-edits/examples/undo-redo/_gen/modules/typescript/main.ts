import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  CellValueChangedEvent,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RangeSelectionModule,
  ClipboardModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
    { field: 'f' },
    { field: 'g' },
    { field: 'h' },
  ],
  defaultColDef: {
    flex: 1,
    editable: true,
  },
  rowData: getRows(),
  enableRangeSelection: true,
  enableFillHandle: true,
  undoRedoCellEditing: true,
  undoRedoCellEditingLimit: 5,
  enableCellChangeFlash: true,
  onFirstDataRendered: onFirstDataRendered,
  onCellValueChanged: onCellValueChanged,
};

function undo() {
  gridOptions.api!.undoCellEditing();
}

function redo() {
  gridOptions.api!.redoCellEditing();
}

function onFirstDataRendered() {
  setValue('#undoInput', 0);
  disable('#undoInput', true);
  disable('#undoBtn', true);

  setValue('#redoInput', 0);
  disable('#redoInput', true);
  disable('#redoBtn', true);
}

function onCellValueChanged(params: CellValueChangedEvent) {
  var undoSize = params.api.getCurrentUndoSize();
  setValue('#undoInput', undoSize);
  disable('#undoBtn', undoSize < 1);

  var redoSize = params.api.getCurrentRedoSize();
  setValue('#redoInput', redoSize);
  disable('#redoBtn', redoSize < 1);
}

function disable(id: string, disabled: boolean) {
  (document.querySelector(id) as any).disabled = disabled;
}

function setValue(id: string, value: number) {
  (document.querySelector(id) as any).value = value;
}

function getRows() {
  return Array.apply(null, Array(100)).map(function (_, i) {
    return {
      a: 'a-' + i,
      b: 'b-' + i,
      c: 'c-' + i,
      d: 'd-' + i,
      e: 'e-' + i,
      f: 'f-' + i,
      g: 'g-' + i,
      h: 'h-' + i,
    };
  });
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).undo = undo;
  (<any>window).redo = redo;
}
