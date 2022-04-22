import {
  CellPosition,
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
  HeaderPosition,
  NavigateToNextCellParams,
  NavigateToNextHeaderParams,
  TabToNextCellParams,
  TabToNextHeaderParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [navigateToNextHeader]="navigateToNextHeader"
    [tabToNextHeader]="tabToNextHeader"
    [tabToNextCell]="tabToNextCell"
    [navigateToNextCell]="navigateToNextCell"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: (ColDef | ColGroupDef)[] = [
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
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }

  navigateToNextHeader(
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

  tabToNextHeader(params: TabToNextHeaderParams): HeaderPosition | null {
    return moveHeaderFocusUpDown(
      params.previousHeaderPosition!,
      params.headerRowCount,
      params.backwards
    );
  }

  tabToNextCell(params: TabToNextCellParams): CellPosition | null {
    const previousCell = params.previousCellPosition;
    const lastRowIndex = previousCell.rowIndex;
    let nextRowIndex = params.backwards ? lastRowIndex - 1 : lastRowIndex + 1;
    const renderedRowCount = this.gridApi.getModel().getRowCount();
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

  navigateToNextCell(params: NavigateToNextCellParams): CellPosition | null {
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
        renderedRowCount = this.gridApi.getModel().getRowCount();
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
}

// define some handy keycode constants
const KEY_LEFT = 'ArrowLeft';
const KEY_UP = 'ArrowUp';
const KEY_RIGHT = 'ArrowRight';
const KEY_DOWN = 'ArrowDown';
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
