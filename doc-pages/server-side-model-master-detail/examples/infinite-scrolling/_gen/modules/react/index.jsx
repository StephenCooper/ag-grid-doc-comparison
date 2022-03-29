"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // group cell renderer needed for expand / collapse icons
        { field: "accountId", cellRenderer: "agGroupCellRenderer" },
        { field: "name" },
        { field: "country" },
        { field: "calls" },
        { field: "totalDuration" },
      ],
      defaultColDef: {
        flex: 1,
      },
      rowModelType: "serverSide",
      serverSideStoreType: "partial",
      detailCellRendererParams: {
        detailGridOptions: {
          columnDefs: [
            { field: "callId" },
            { field: "direction" },
            { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
            { field: "switchCode", minWidth: 150 },
            { field: "number", minWidth: 180 },
          ],
          defaultColDef: {
            flex: 1,
          },
        },
        getDetailRowData: function (params) {
          // supply details records to detail cell renderer (i.e. detail grid)
          params.successCallback(params.data.callRecords);
        },
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      var server = getFakeServer(data);
      var datasource = getServerSideDatasource(server);
      params.api.setServerSideDatasource(datasource);
    };

    fetch("https://www.ag-grid.com/example-assets/call-data.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));

    setTimeout(function () {
      // expand some master row
      var someRow = params.api.getRowNode("1");
      if (someRow) {
        someRow.setExpanded(true);
      }
    }, 1000);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ height: "100%", boxSizing: "border-box" }}>
          <div
            style={{
              height: "100%",
              width: "100%",
            }}
            className="ag-theme-alpine-dark"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              animateRows={true}
              rowModelType={this.state.rowModelType}
              serverSideStoreType={this.state.serverSideStoreType}
              masterDetail={true}
              detailCellRendererParams={this.state.detailCellRendererParams}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getServerSideDatasource(server) {
  return {
    getRows: function (params) {
      // adding delay to simulate real server call
      setTimeout(function () {
        var response = server.getResponse(params.request);
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 500);
    },
  };
}
function getFakeServer(allData) {
  return {
    getResponse: function (request) {
      console.log(
        "asking for rows: " + request.startRow + " to " + request.endRow
      );
      // take a slice of the total rows
      var rowsThisPage = allData.slice(request.startRow, request.endRow);
      // if row count is known, it's possible to skip over blocks
      var lastRow = allData.length;
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow,
      };
    },
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
