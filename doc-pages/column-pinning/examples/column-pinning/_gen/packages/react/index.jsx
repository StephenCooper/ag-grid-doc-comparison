"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "#",
          colId: "rowNum",
          valueGetter: "node.id",
          width: 80,
          pinned: "left",
        },
        { field: "athlete", width: 150, pinned: "left" },
        { field: "age", width: 90, pinned: "left" },
        { field: "country", width: 150 },
        { field: "year", width: 90 },
        { field: "date", width: 110 },
        { field: "sport", width: 150 },
        { field: "gold", width: 100 },
        { field: "silver", width: 100 },
        { field: "bronze", width: 100 },
        { field: "total", width: 100, pinned: "right" },
      ],
      defaultColDef: {
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

  clearPinned = () => {
    this.gridColumnApi.applyColumnState({ defaultState: { pinned: null } });
  };

  resetPinned = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "rowNum", pinned: "left" },
        { colId: "athlete", pinned: "left" },
        { colId: "age", pinned: "left" },
        { colId: "total", pinned: "right" },
      ],
      defaultState: { pinned: null },
    });
  };

  pinCountry = () => {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "country", pinned: "left" }],
      defaultState: { pinned: null },
    });
  };

  jumpToCol = () => {
    const value = document.getElementById("col").value;
    if (typeof value !== "string" || value === "") {
      return;
    }
    const index = Number(value);
    if (typeof index !== "number" || isNaN(index)) {
      return;
    }
    // it's actually a column the api needs, so look the column up
    const allColumns = this.gridColumnApi.getAllColumns();
    if (allColumns) {
      const column = allColumns[index];
      if (column) {
        this.gridApi.ensureColumnVisible(column);
      }
    }
  };

  jumpToRow = () => {
    var value = document.getElementById("row").value;
    const index = Number(value);
    if (typeof index === "number" && !isNaN(index)) {
      this.gridApi.ensureIndexVisible(index);
    }
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div className="example-header">
            <div style={{ padding: "4px" }}>
              <button onClick={() => this.clearPinned()}>Clear Pinned</button>
              <button onClick={() => this.resetPinned()}>
                Left = #, Athlete, Age; Right = Total
              </button>
              <button onClick={() => this.pinCountry()}>Left = Country</button>
            </div>

            <div style={{ padding: "4px" }}>
              Jump to:
              <input
                placeholder="row"
                type="text"
                style={{ width: "40px" }}
                id="row"
                onInput={() => this.jumpToRow()}
              />
              <input
                placeholder="col"
                type="text"
                style={{ width: "40px" }}
                id="col"
                onInput={() => this.jumpToCol()}
              />
            </div>
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
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
