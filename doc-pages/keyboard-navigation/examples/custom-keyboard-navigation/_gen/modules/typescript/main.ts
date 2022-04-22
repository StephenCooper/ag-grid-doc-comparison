import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  CellPosition,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  HeaderPosition,
  ModuleRegistry,
  NavigateToNextCellParams,
  NavigateToNextHeaderParams,
  TabToNextCellParams,
  TabToNextHeaderParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: 'Athlete',
    children: [
      { field: 'athlete', headerName: 'Name', minWidth: 170 },
      { field: 'age' },
      { field: 'country' },
    ],
  },

  { field: 'year' },
  { field: 'sport' },
  {
    headerName: 'Medals',
    children: [
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ],
  },
];

// define some handy keycode constants
const KEY_LEFT = 'ArrowLeft';
const KEY_UP = 'ArrowUp';
const KEY_RIGHT = 'ArrowRight';
const KEY_DOWN = 'ArrowDown';

const gridOptions: GridOptions = {
  // make all cols editable
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },

  navigateToNextCell: navigateToNextCell,
  tabToNextCell: tabToNextCell,

  navigateToNextHeader: navigateToNextHeader,
  tabToNextHeader: tabToNextHeader,

  columnDefs: columnDefs,
};

function navigateToNextHeader(
  params: NavigateToNextHeaderParams
): HeaderPosition | null {
  const nextHeader = params.nextHeaderPosition;

  if (params.key !== 'ArrowDown' && params.key !== 'ArrowUp') {
    return nextHeader;
  }

  const processedNextHeader = moveHeaderFocusUpDown(
    params.previousHeaderPosition!,
    params.headerRowCount,
    params.key === 'ArrowDown'
  );

  return processedNextHeader === nextHeader ? null : processedNextHeader;
}

function tabToNextHeader(params: TabToNextHeaderParams): HeaderPosition | null {
  return moveHeaderFocusUpDown(
    params.previousHeaderPosition!,
    params.headerRowCount,
    params.backwards
  );
}

function moveHeaderFocusUpDown(
  previousHeader: HeaderPosition,
  headerRowCount: number,
  isUp: boolean
) {
  const previousColumn = previousHeader.column;
  const lastRowIndex = previousHeader.headerRowIndex;
  let nextRowIndex = isUp ? lastRowIndex - 1 : lastRowIndex + 1;
  let nextColumn;

  if (nextRowIndex === -1) {
    return previousHeader;
  }
  if (nextRowIndex === headerRowCount) {
    nextRowIndex = -1;
  }

  const parentColumn = previousColumn.getParent();

  if (isUp) {
    nextColumn = parentColumn || previousColumn;
  } else {
    nextColumn = (previousColumn as any).children
      ? (previousColumn as any).children[0]
      : previousColumn;
  }

  return {
    headerRowIndex: nextRowIndex,
    column: nextColumn,
  };
}

function tabToNextCell(params: TabToNextCellParams): CellPosition | null {
  const previousCell = params.previousCellPosition;
  const lastRowIndex = previousCell.rowIndex;
  let nextRowIndex = params.backwards ? lastRowIndex - 1 : lastRowIndex + 1;
  const renderedRowCount = gridOptions.api!.getModel().getRowCount();

  if (nextRowIndex < 0) {
    nextRowIndex = -1;
  }
  if (nextRowIndex >= renderedRowCount) {
    nextRowIndex = renderedRowCount - 1;
  }

  const result = {
    rowIndex: nextRowIndex,
    column: previousCell.column,
    rowPinned: previousCell.rowPinned,
  };

  return result;
}

function navigateToNextCell(
  params: NavigateToNextCellParams
): CellPosition | null {
  const previousCell = params.previousCellPosition,
    suggestedNextCell = params.nextCellPosition;
  let nextRowIndex, renderedRowCount;

  switch (params.key) {
    case KEY_DOWN:
      // return the cell above
      nextRowIndex = previousCell.rowIndex - 1;
      if (nextRowIndex < -1) {
        return null;
      } // returning null means don't navigate

      return {
        rowIndex: nextRowIndex,
        column: previousCell.column,
        rowPinned: previousCell.rowPinned,
      };
    case KEY_UP:
      // return the cell below
      nextRowIndex = previousCell.rowIndex + 1;
      renderedRowCount = gridOptions.api!.getModel().getRowCount();
      if (nextRowIndex >= renderedRowCount) {
        return null;
      } // returning null means don't navigate

      return {
        rowIndex: nextRowIndex,
        column: previousCell.column,
        rowPinned: previousCell.rowPinned,
      };
    case KEY_LEFT:
    case KEY_RIGHT:
      return suggestedNextCell;
    default:
      throw Error(
        'this will never happen, navigation is always one of the 4 keys above'
      );
  }
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
