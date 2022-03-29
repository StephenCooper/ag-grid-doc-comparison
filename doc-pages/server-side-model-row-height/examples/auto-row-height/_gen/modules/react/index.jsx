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
        {
          headerName: "Group",
          field: "name",
          rowGroup: true,
          hide: true,
        },
        {
          field: "autoA",
          wrapText: true,
          autoHeight: true,
          aggFunc: "last",
        },
        {
          field: "autoB",
          wrapText: true,
          autoHeight: true,
          aggFunc: "last",
        },
      ],
      defaultColDef: {
        flex: 1,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: {
        flex: 1,
        maxWidth: 200,
      },
      rowModelType: "serverSide",
      serverSideStoreType: "partial",
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // generate data for example
    var data = getData();
    // setup the fake server with entire dataset
    var fakeServer = new FakeServer(data);
    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api.setServerSideDatasource(datasource);
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
            animateRows={true}
            suppressAggFuncInHeader={true}
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
      }, 200);
    },
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
