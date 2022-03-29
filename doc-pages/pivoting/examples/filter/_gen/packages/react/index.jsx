"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "country", pivot: true, enablePivot: true },
        { field: "year" },
        { field: "date" },
        { field: "sport" },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
        resizable: true,
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => params.api.setRowData(data);

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  clearFilter = () => {
    this.gridApi.setFilterModel(null);
    setTitle("All Medals by Country");
  };

  filterUKAndIrelandBoxing = () => {
    this.gridApi.setFilterModel({
      country: {
        type: "set",
        values: ["Ireland", "Great Britain"],
      },
      sport: {
        type: "set",
        values: ["Boxing"],
      },
    });
    setTitle("UK and Ireland - Boxing");
  };

  filterUKAndIrelandEquestrian = () => {
    this.gridApi.setFilterModel({
      country: {
        type: "set",
        values: ["Ireland", "Great Britain"],
      },
      sport: {
        type: "set",
        values: ["Equestrian"],
      },
    });
    setTitle("UK and Ireland - Equestrian");
  };

  filterUsaAndCanadaBoxing = () => {
    this.gridApi.setFilterModel({
      country: {
        type: "set",
        values: ["United States", "Canada"],
      },
      sport: {
        type: "set",
        values: ["Bobsleigh"],
      },
    });
    setTitle("USA and Canada - Boxing");
  };

  filterUsaAndCanadaEquestrian = () => {
    this.gridApi.setFilterModel({
      country: {
        type: "set",
        values: ["United States", "Canada"],
      },
      sport: {
        type: "set",
        values: ["Equestrian"],
      },
    });
    setTitle("USA and Canada - Equestrian");
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="test-container">
          <div className="test-header">
            <div style={{ marginBottom: "10px" }}>
              <button onClick={() => this.clearFilter()}>Clear Filter</button>
              <button onClick={() => this.filterUKAndIrelandBoxing()}>
                UK and Ireland Boxing
              </button>
              <button onClick={() => this.filterUKAndIrelandEquestrian()}>
                UK and Ireland Equestrian
              </button>
              <button onClick={() => this.filterUsaAndCanadaBoxing()}>
                USA and Canada Bobsleigh
              </button>
              <button onClick={() => this.filterUsaAndCanadaEquestrian()}>
                USA and Canada Equestrian
              </button>
            </div>
            <div id="title">All Medals by Country</div>
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              pivotMode={true}
              sideBar={true}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

function setTitle(title) {
  document.querySelector("#title").innerText = title;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
