"use strict";

import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgGridReact } from "@ag-grid-community/react";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "country", enableRowGroup: true, rowGroup: true },
        { field: "sport", enableRowGroup: true, rowGroup: true },
        { field: "year", minWidth: 100 },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        resizable: true,
        sortable: true,
      },
      rowGroupPanelShow: "always",
      autoGroupColumnDef: {
        flex: 1,
        minWidth: 280,
      },
      cacheBlockSize: 4,
      rowModelType: "serverSide",
      serverSideStoreType: "partial",
      getServerSideStoreParams: function (params) {
        var noGroupingActive = params.rowGroupColumns.length == 0;
        var res;
        if (noGroupingActive) {
          res = {
            // infinite scrolling
            storeType: "partial",
            // 100 rows per block
            cacheBlockSize: 100,
            // purge blocks that are not needed
            maxBlocksInCache: 2,
          };
        } else {
          var topLevelRows = params.level == 0;
          res = {
            storeType: topLevelRows ? "full" : "partial",
            cacheBlockSize: params.level == 1 ? 5 : 2,
            maxBlocksInCache: -1, // never purge blocks
          };
        }
        console.log("############## NEW STORE ##############");
        console.log(
          "getServerSideStoreParams, level = " +
            params.level +
            ", result = " +
            JSON.stringify(res)
        );
        return res;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      // setup the fake server with entire dataset
      var fakeServer = new FakeServer(data);
      // create datasource with a reference to the fake server
      var datasource = getServerSideDatasource(fakeServer);
      // register the datasource with the grid
      params.api.setServerSideDatasource(datasource);
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
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
            rowGroupPanelShow={this.state.rowGroupPanelShow}
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            cacheBlockSize={this.state.cacheBlockSize}
            rowModelType={this.state.rowModelType}
            serverSideStoreType={this.state.serverSideStoreType}
            getServerSideStoreParams={this.state.getServerSideStoreParams}
            suppressAggFuncInHeader={true}
            animateRows={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function getServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
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
      }, 400);
    },
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
