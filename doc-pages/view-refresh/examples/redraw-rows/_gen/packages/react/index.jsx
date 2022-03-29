"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: "A", field: "a" },
        { headerName: "B", field: "b" },
        { headerName: "C", field: "c" },
        { headerName: "D", field: "d" },
        { headerName: "E", field: "e" },
        { headerName: "F", field: "f" },
      ],
      defaultColDef: {
        flex: 1,
      },
      rowData: createData(12),
      getRowStyle: function () {
        return {
          backgroundColor: colors[colorIndex],
        };
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  redrawAllRows = () => {
    progressColor();
    this.gridApi.redrawRows();
  };

  redrawTopRows = () => {
    progressColor();
    var rows = [];
    for (var i = 0; i < 6; i++) {
      var row = this.gridApi.getDisplayedRowAtIndex(i);
      rows.push(row);
    }
    this.gridApi.redrawRows({ rowNodes: rows });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.redrawAllRows()}>
              Redraw All Rows
            </button>
            <button onClick={() => this.redrawTopRows()}>
              Redraw Top Rows
            </button>
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
              rowData={this.state.rowData}
              getRowStyle={this.state.getRowStyle}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

var colorIndex = 0;
var colors = ["#000000", "#000066", "#006600", "#660000"];
function createData(count) {
  var result = [];
  for (var i = 1; i <= count; i++) {
    result.push({
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return result;
}
function progressColor() {
  colorIndex++;
  if (colorIndex === colors.length) {
    colorIndex = 0;
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
