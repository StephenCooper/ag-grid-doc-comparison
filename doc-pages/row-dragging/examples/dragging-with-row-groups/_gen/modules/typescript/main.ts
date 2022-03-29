import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  Grid,
  GridOptions,
  ModuleRegistry,
  RowDragCallbackParams,
  RowDragEndEvent,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

var rowDrag = function (params: RowDragCallbackParams) {
  // only rows that are NOT groups should be draggable
  return !params.node.group;
};

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete", rowDrag: rowDrag },
    { field: "country", rowGroup: true },
    { field: "year", width: 100 },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ],
  defaultColDef: {
    width: 170,
    sortable: true,
    filter: true,
  },
  animateRows: true,
  groupDefaultExpanded: 1,
  onRowDragMove: onRowDragMove,
  onGridReady: function () {
    gridOptions.api!.setRowData(getData());
  },
};

function onRowDragMove(event: RowDragEndEvent) {
  var movingNode = event.node!;
  var overNode = event.overNode!;

  // find out what country group we are hovering over
  var groupCountry;
  if (overNode.group) {
    // if over a group, we take the group key (which will be the
    // country as we are grouping by country)
    groupCountry = overNode.key;
  } else {
    // if over a non-group, we take the country directly
    groupCountry = overNode.data.country;
  }

  var needToChangeParent = movingNode.data.country !== groupCountry;

  if (needToChangeParent) {
    var movingData = movingNode.data;
    movingData.country = groupCountry;
    gridOptions.api!.applyTransaction({
      update: [movingData],
    });
    gridOptions.api!.clearFocusedCell();
  }
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
