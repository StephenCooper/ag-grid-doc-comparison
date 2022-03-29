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
        {
          field: "athlete",
          enableRowGroup: true,
          enablePivot: true,
          minWidth: 200,
        },
        { field: "age", enableValue: true },
        { field: "country", enableRowGroup: true, enablePivot: true },
        { field: "year", enableRowGroup: true, enablePivot: true },
        { field: "date", enableRowGroup: true, enablePivot: true },
        {
          field: "sport",
          enableRowGroup: true,
          enablePivot: true,
          minWidth: 200,
        },
        { field: "gold", enableValue: true, aggFunc: "sum" },
        { field: "silver", enableValue: true },
        { field: "bronze", enableValue: true },
        { field: "total", enableValue: true },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 250,
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

  turnOffPivotMode = () => {
    this.gridColumnApi.setPivotMode(false);
  };

  turnOnPivotMode = () => {
    this.gridColumnApi.setPivotMode(true);
  };

  addPivotColumn = () => {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "country", pivot: true }],
      defaultState: { pivot: false },
    });
  };

  addPivotColumns = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "year", pivot: true },
        { colId: "country", pivot: true },
      ],
      defaultState: { pivot: false },
    });
  };

  removePivotColumn = () => {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "country", pivot: false }],
    });
  };

  emptyPivotColumns = () => {
    this.gridColumnApi.applyColumnState({
      defaultState: { pivot: false },
    });
  };

  exportToCsv = () => {
    this.gridApi.exportDataAsCsv();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ marginBottom: "5px" }}>
          <div>
            <button onClick={() => this.turnOnPivotMode()}>
              Pivot Mode On
            </button>
            <button onClick={() => this.turnOffPivotMode()}>
              Pivot Mode Off
            </button>
            <button
              onClick={() => this.addPivotColumn()}
              style={{ marginLeft: "15px" }}
            >
              Pivot Country
            </button>
            <button onClick={() => this.addPivotColumns()}>
              Pivot Year &amp; Country
            </button>
            <button onClick={() => this.removePivotColumn()}>
              Un-Pivot Country
            </button>
          </div>
          <div style={{ marginTop: "5px" }}>
            <button onClick={() => this.emptyPivotColumns()}>
              Remove All Pivots
            </button>
            <button
              onClick={() => this.exportToCsv()}
              style={{ marginLeft: "15px" }}
            >
              CSV Export
            </button>
          </div>
        </div>
        <div style={{ height: "calc(100% - 60px)" }}>
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
              autoGroupColumnDef={this.state.autoGroupColumnDef}
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

render(<GridExample></GridExample>, document.querySelector("#root"));
