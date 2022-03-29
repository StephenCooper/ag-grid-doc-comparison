"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "#",
          maxWidth: 100,
          valueGetter: hashValueGetter,
        },
        { field: "a" },
        { field: "b" },
        {
          headerName: "A + B",
          colId: "a&b",
          valueGetter: abValueGetter,
        },
        {
          headerName: "A * 1000",
          minWidth: 95,
          valueGetter: a1000ValueGetter,
        },
        {
          headerName: "B * 137",
          minWidth: 90,
          valueGetter: b137ValueGetter,
        },
        {
          headerName: "Random",
          minWidth: 90,
          valueGetter: randomValueGetter,
        },
        {
          headerName: "Chain",
          valueGetter: chainValueGetter,
        },
        {
          headerName: "Const",
          minWidth: 85,
          valueGetter: constValueGetter,
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 75,
        // cellClass: 'number-cell'
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

var hashValueGetter = function (params) {
  return params.node ? params.node.rowIndex : null;
};
function abValueGetter(params) {
  return params.data.a + params.data.b;
}
var a1000ValueGetter = function (params) {
  return params.data.a * 1000;
};
var b137ValueGetter = function (params) {
  return params.data.b * 137;
};
var randomValueGetter = function () {
  return Math.floor(Math.random() * 1000);
};
var chainValueGetter = function (params) {
  return params.getValue("a&b") * 1000;
};
var constValueGetter = function () {
  return 99999;
};
function createRowData() {
  var rowData = [];
  for (var i = 0; i < 100; i++) {
    rowData.push({
      a: Math.floor(i % 4),
      b: Math.floor(i % 7),
    });
  }
  return rowData;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
