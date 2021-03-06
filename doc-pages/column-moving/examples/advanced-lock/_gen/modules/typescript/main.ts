import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  ColumnPinnedEvent,
  ColumnState,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ControlsCellRenderer } from './controlsCellRenderer';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: ColDef[] = [
  {
    lockPosition: 'left',
    valueGetter: 'node.rowIndex',
    cellClass: 'locked-col',
    width: 60,
    suppressNavigable: true,
  },
  {
    lockPosition: 'left',
    cellRenderer: ControlsCellRenderer,
    cellClass: 'locked-col',
    width: 120,
    suppressNavigable: true,
  },
  { field: 'athlete' },
  { field: 'age' },
  { field: 'country' },
  { field: 'year' },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    width: 150,
    resizable: true,
  },
  onColumnPinned: onColumnPinned,
  suppressDragLeaveHidesColumns: true,
};

function onColumnPinned(event: ColumnPinnedEvent) {
  const allCols = event.columnApi.getAllGridColumns();

  const allFixedCols = allCols.filter((col) => col.getColDef().lockPosition);
  const allNonFixedCols = allCols.filter(
    (col) => !col.getColDef().lockPosition
  );

  const pinnedCount = allNonFixedCols.filter(
    (col) => col.getPinned() === 'left'
  ).length;

  const pinFixed = pinnedCount > 0;

  const columnStates: ColumnState[] = [];
  allFixedCols.forEach((col) => {
    if (pinFixed !== col.isPinned()) {
      columnStates.push({
        colId: col.getId(),
        pinned: pinFixed ? 'left' : null,
      });
    }
  });

  if (columnStates.length > 0) {
    event.columnApi.applyColumnState({ state: columnStates });
  }
}

function onPinAthlete() {
  gridOptions.columnApi!.applyColumnState({
    state: [{ colId: 'athlete', pinned: 'left' }],
  });
}

function onUnpinAthlete() {
  gridOptions.columnApi!.applyColumnState({
    state: [{ colId: 'athlete', pinned: null }],
  });
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onPinAthlete = onPinAthlete;
  (<any>window).onUnpinAthlete = onUnpinAthlete;
}
