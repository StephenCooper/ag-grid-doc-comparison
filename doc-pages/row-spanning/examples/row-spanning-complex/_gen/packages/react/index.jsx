"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class ShowCellRenderer {
  init(params) {
    const cellBlank = !params.value;
    if (cellBlank) {
      return;
    }

    this.ui = document.createElement("div");
    this.ui.innerHTML =
      '<div class="show-name">' +
      params.value.name +
      "" +
      "</div>" +
      '<div class="show-presenter">' +
      params.value.presenter +
      "</div>";
  }

  getGui() {
    return this.ui;
  }

  refresh() {
    return false;
  }
}

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "localTime" },
        {
          field: "show",
          cellRenderer: ShowCellRenderer,
          rowSpan: rowSpan,
          cellClassRules: {
            "show-cell": "value !== undefined",
          },
          width: 200,
        },
        { field: "a" },
        { field: "b" },
        { field: "c" },
        { field: "d" },
        { field: "e" },
      ],
      defaultColDef: {
        resizable: true,
        width: 170,
      },
      rowData: getData(),
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
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            suppressRowTransform={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function rowSpan(params) {
  if (params.data.show) {
    return 4;
  } else {
    return 1;
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
