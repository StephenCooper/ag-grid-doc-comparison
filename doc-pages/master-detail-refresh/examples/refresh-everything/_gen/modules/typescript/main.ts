import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  GetRowIdFunc,
  Grid,
  GridOptions,
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
  getRowId: function (params) {
    return params.data.account;
  },
  masterDetail: true,
  enableCellChangeFlash: true,
  detailCellRendererParams: {
    refreshStrategy: "everything",

    template: function (params) {
      return (
        '<div class="ag-details-row ag-details-row-fixed-height">' +
        '<div style="padding: 4px; font-weight: bold;">' +
        params.data.name +
        " " +
        params.data.calls +
        " calls</div>" +
        '<div ref="eDetailGrid" class="ag-details-grid ag-details-grid-fixed-height"/>' +
        "</div>"
      );
    },

    detailGridOptions: {
      rowSelection: "multiple",
      enableCellChangeFlash: true,
      getRowId: function (params) {
        return params.data.callId;
      },
      columnDefs: [
        { field: "callId", checkboxSelection: true },
        { field: "direction" },
        { field: "number", minWidth: 150 },
        { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
        { field: "switchCode", minWidth: 150 },
      ],
      defaultColDef: {
        flex: 1,
        sortable: true,
      },
    },
    getDetailRowData: function (params) {
      // params.successCallback([]);
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams,
  onFirstDataRendered: onFirstDataRendered,
};

let allRowData: any[];

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  // arbitrarily expand a row for presentational purposes
  setTimeout(function () {
    params.api.getDisplayedRowAtIndex(0)!.setExpanded(true);
  }, 0);

  setInterval(function () {
    if (!allRowData) {
      return;
    }

    const data = allRowData[0];

    const newCallRecords: any[] = [];
    data.callRecords.forEach(function (record: any, index: number) {
      newCallRecords.push({
        name: record.name,
        callId: record.callId,
        duration: record.duration + (index % 2),
        switchCode: record.switchCode,
        direction: record.direction,
        number: record.number,
      });
    });

    data.callRecords = newCallRecords;
    data.calls++;

    const tran = {
      update: [data],
    };

    params.api.applyTransaction(tran);
  }, 2000);
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
  .then((response) => response.json())
  .then(function (data) {
    allRowData = data;
    gridOptions.api!.setRowData(data);
  });
