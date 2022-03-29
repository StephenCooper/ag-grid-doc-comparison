import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  ICellRendererParams,
  IDetailCellRendererParams,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    // group cell renderer needed for expand / collapse icons
    { field: "name", cellRenderer: "agGroupCellRenderer" },
    { field: "account" },
    { field: "calls" },
    { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
  ],
  defaultColDef: {
    flex: 1,
  },
  masterDetail: true,
  detailRowHeight: 195,
  detailCellRendererParams: function (params: ICellRendererParams) {
    var res = {} as IDetailCellRendererParams;

    // we use the same getDetailRowData for both options
    res.getDetailRowData = function (params) {
      params.successCallback(params.data.callRecords);
    };

    var nameMatch =
      params.data.name === "Mila Smith" ||
      params.data.name === "Harper Johnson";

    if (nameMatch) {
      // grid options for columns {callId, number}
      res.detailGridOptions = {
        columnDefs: [{ field: "callId" }, { field: "number" }],
        defaultColDef: {
          flex: 1,
        },
      };
    } else {
      // grid options for columns {callId, direction, duration, switchCode}
      res.detailGridOptions = {
        columnDefs: [
          { field: "callId" },
          { field: "direction" },
          { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
          { field: "switchCode" },
        ],
        defaultColDef: {
          flex: 1,
        },
      };
    }

    return res;
  },
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  // arbitrarily expand a row for presentational purposes
  setTimeout(function () {
    var node1 = params.api.getDisplayedRowAtIndex(1)!;
    var node2 = params.api.getDisplayedRowAtIndex(2)!;
    node1.setExpanded(true);
    node2.setExpanded(true);
  }, 0);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
  .then((response) => response.json())
  .then(function (data) {
    gridOptions.api!.setRowData(data);
  });
