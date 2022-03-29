"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "id", maxWidth: 75 },
        { field: "athlete", minWidth: 190 },
        { field: "age" },
        { field: "year" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 90,
        resizable: true,
      },
      rowModelType: "serverSide",
      serverSideStoreType: "partial",
      paginationPageSize: 10,
      cacheBlockSize: 10,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      // add id to data
      var idSequence = 1;
      data.forEach(function (item) {
        item.id = idSequence++;
      });
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
            rowModelType={this.state.rowModelType}
            serverSideStoreType={this.state.serverSideStoreType}
            pagination={true}
            paginationPageSize={this.state.paginationPageSize}
            cacheBlockSize={this.state.cacheBlockSize}
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
      }, 200);
    },
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
