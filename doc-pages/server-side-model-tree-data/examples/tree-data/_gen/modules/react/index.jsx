"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "employeeId", hide: true },
        { field: "employeeName", hide: true },
        { field: "jobTitle" },
        { field: "employmentType" },
      ],
      defaultColDef: {
        width: 240,
        filter: "agTextColumnFilter",
        flex: 1,
      },
      autoGroupColumnDef: {
        field: "employeeName",
        cellRendererParams: {
          innerRenderer: function (params) {
            // display employeeName rather than group key (employeeId)
            return params.data.employeeName;
          },
        },
      },
      rowModelType: "serverSide",
      serverSideStoreType: "partial",
      isServerSideGroupOpenByDefault: function (params) {
        // open first two levels by default
        return params.rowNode.level < 2;
      },
      isServerSideGroup: function (dataItem) {
        // indicate if node is a group
        return dataItem.group;
      },
      getServerSideGroupKey: function (dataItem) {
        // specify which group key to use
        return dataItem.employeeId;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      var fakeServer = createFakeServer(data);
      var datasource = createServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
    };

    fetch("https://www.ag-grid.com/example-assets/small-tree-data.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
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
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            rowModelType={this.state.rowModelType}
            serverSideStoreType={this.state.serverSideStoreType}
            treeData={true}
            animateRows={true}
            isServerSideGroupOpenByDefault={
              this.state.isServerSideGroupOpenByDefault
            }
            isServerSideGroup={this.state.isServerSideGroup}
            getServerSideGroupKey={this.state.getServerSideGroupKey}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function createFakeServer(fakeServerData) {
  const fakeServer = {
    data: fakeServerData,
    getData: function (request) {
      function extractRowsFromData(groupKeys, data) {
        if (groupKeys.length === 0) {
          return data.map(function (d) {
            return {
              group: !!d.children,
              employeeId: d.employeeId,
              employeeName: d.employeeName,
              employmentType: d.employmentType,
              jobTitle: d.jobTitle,
            };
          });
        }
        var key = groupKeys[0];
        for (var i = 0; i < data.length; i++) {
          if (data[i].employeeId === key) {
            return extractRowsFromData(
              groupKeys.slice(1),
              data[i].children.slice()
            );
          }
        }
      }
      return extractRowsFromData(request.groupKeys, this.data);
    },
  };
  return fakeServer;
}
function createServerSideDatasource(fakeServer) {
  const dataSource = {
    getRows: function (params) {
      console.log("ServerSideDatasource.getRows: params = ", params);
      var allRows = fakeServer.getData(params.request);
      var request = params.request;
      var doingInfinite = request.startRow != null && request.endRow != null;
      var result = doingInfinite
        ? {
            rowData: allRows.slice(request.startRow, request.endRow),
            rowCount: allRows.length,
          }
        : { rowData: allRows };
      console.log("getRows: result = ", result);
      setTimeout(function () {
        params.success(result);
      }, 200);
    },
  };
  return dataSource;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
