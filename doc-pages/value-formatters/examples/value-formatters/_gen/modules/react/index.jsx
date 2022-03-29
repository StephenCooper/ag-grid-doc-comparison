"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: "A", field: "a" },
        { headerName: "B", field: "b" },
        { headerName: "£A", field: "a", valueFormatter: currencyFormatter },
        { headerName: "£B", field: "b", valueFormatter: currencyFormatter },
        { headerName: "(A)", field: "a", valueFormatter: bracketsFormatter },
        { headerName: "(B)", field: "b", valueFormatter: bracketsFormatter },
      ],
      defaultColDef: {
        flex: 1,
        cellClass: "number-cell",
        resizable: true,
      },
      rowData: createRowData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function bracketsFormatter(params) {
  return "(" + params.value + ")";
}
function currencyFormatter(params) {
  return "£" + formatNumber(params.value);
}
function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function createRowData() {
  var rowData = [];
  for (var i = 0; i < 100; i++) {
    rowData.push({
      a: Math.floor(((i + 2) * 173456) % 10000),
      b: Math.floor(((i + 7) * 373456) % 10000),
    });
  }
  return rowData;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
