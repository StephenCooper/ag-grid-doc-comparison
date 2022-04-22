import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  ModuleRegistry,
  RowHeightParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

var swimmingHeight: number;
var groupHeight: number;
var russiaHeight: number;

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true },
    { field: 'athlete' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],
  rowData: getData(),
  animateRows: true,
  groupDefaultExpanded: 1,
  getRowHeight: getRowHeight,
};

function getRowHeight(params: RowHeightParams): number | undefined | null {
  if (params.node.group && groupHeight != null) {
    return groupHeight;
  } else if (
    params.data &&
    params.data.country === 'Russia' &&
    russiaHeight != null
  ) {
    return russiaHeight;
  } else if (
    params.data &&
    params.data.sport === 'Swimming' &&
    swimmingHeight != null
  ) {
    return swimmingHeight;
  }
}

function setSwimmingHeight(height: number) {
  swimmingHeight = height;
  gridOptions.api!.resetRowHeights();
}

function setGroupHeight(height: number) {
  groupHeight = height;
  gridOptions.api!.resetRowHeights();
}

function setRussiaHeight(height: number) {
  // this is used next time resetRowHeights is called
  russiaHeight = height;

  gridOptions.api!.forEachNode(function (rowNode) {
    if (rowNode.data && rowNode.data.country === 'Russia') {
      rowNode.setRowHeight(height);
    }
  });
  gridOptions.api!.onRowHeightChanged();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).setSwimmingHeight = setSwimmingHeight;
  (<any>window).setGroupHeight = setGroupHeight;
  (<any>window).setRussiaHeight = setRussiaHeight;
}
