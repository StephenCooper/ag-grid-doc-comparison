"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "country", rowGroup: true, enableRowGroup: true, hide: true },
        { field: "year", rowGroup: true, enableRowGroup: true, hide: true },
        { field: "version" },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: {
        flex: 1,
        minWidth: 280,
        field: "athlete",
      },
      rowModelType: "serverSide",
      serverSideStoreType: "full",
      rowGroupPanelShow: "always",
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

  refreshCache = (route) => {
    versionCounter++;
    var purge = document.querySelector("#purge").checked === true;
    this.gridApi.refreshServerSideStore({ route: route, purge: purge });
  };

  getBlockState = () => {
    var blockState = this.gridApi.getCacheBlockState();
    console.log(blockState);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.refreshCache([])}>
              Refresh Top Level
            </button>
            <button onClick={() => this.refreshCache(["Canada"])}>
              Refresh [Canada]
            </button>
            <button onClick={() => this.refreshCache(["Canada", 2002])}>
              Refresh [Canada,2002]
            </button>
            <button onClick={() => this.getBlockState()}>
              Print Block State
            </button>

            <label>
              <input type="checkbox" id="purge" /> Purge
            </label>
          </div>
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
              suppressAggFuncInHeader={true}
              rowGroupPanelShow={this.state.rowGroupPanelShow}
              animateRows={true}
              debug={true}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

var versionCounter = 1;
function getServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      response.rows = response.rows.map(function (item) {
        var res = {};
        Object.assign(res, item);
        res.version =
          versionCounter + " - " + versionCounter + " - " + versionCounter;
        return res;
      });
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
      }, 1000);
    },
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
