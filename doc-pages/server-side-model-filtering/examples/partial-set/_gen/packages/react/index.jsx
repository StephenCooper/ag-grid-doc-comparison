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
        {
          field: "country",
          filter: "agSetColumnFilter",
          filterParams: {
            values: getCountryValuesAsync,
          },
          menuTabs: ["filterMenuTab"],
        },
        {
          field: "sport",
          filter: "agSetColumnFilter",
          filterParams: {
            values: getSportValuesAsync,
          },
          menuTabs: ["filterMenuTab"],
        },
        { field: "athlete", menuTabs: undefined },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
      },
      rowModelType: "serverSide",
      serverSideStoreType: "partial",
      cacheBlockSize: 100,
      maxBlocksInCache: 10,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      // setup the fake server with entire dataset
      fakeServer = new FakeServer(data);
      // create datasource with a reference to the fake server
      var datasource = getServerSideDatasource(fakeServer);
      // register the datasource with the grid
      params.api.setServerSideDatasource(datasource);
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFilterChanged = () => {
    var countryFilterModel = this.gridApi.getFilterModel()["country"];
    var selected = countryFilterModel && countryFilterModel.values;
    if (!areEqual(selectedCountries, selected)) {
      selectedCountries = selected;
      console.log("Refreshing sports filter");
      var sportFilter = this.gridApi.getFilterInstance("sport");
      sportFilter.refreshFilterValues();
    }
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
            cacheBlockSize={this.state.cacheBlockSize}
            maxBlocksInCache={this.state.maxBlocksInCache}
            animateRows={true}
            onGridReady={this.onGridReady}
            onFilterChanged={this.onFilterChanged.bind(this)}
          />
        </div>
      </div>
    );
  }
}

var fakeServer;
var selectedCountries = null;
function areEqual(a, b) {
  if (a == null && b == null) {
    return true;
  }
  if (a != null || b != null) {
    return false;
  }
  return (
    a.length === b.length &&
    a.every(function (v, i) {
      return b[i] === v;
    })
  );
}
function getCountryValuesAsync(params) {
  var countries = fakeServer.getCountries();
  // simulating real server call with a 500ms delay
  setTimeout(function () {
    params.success(countries);
  }, 500);
}
function getSportValuesAsync(params) {
  var sports = fakeServer.getSports(selectedCountries);
  // simulating real server call with a 500ms delay
  setTimeout(function () {
    params.success(sports);
  }, 500);
}
function getServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      // get data for request from our fake server
      var response = server.getData(params.request);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
