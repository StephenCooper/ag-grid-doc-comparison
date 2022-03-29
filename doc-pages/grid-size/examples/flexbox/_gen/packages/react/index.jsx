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
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 },
      ],
      columnDefs: [{ field: "make" }, { field: "model" }, { field: "price" }],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
    window.addEventListener("resize", function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });

    params.api.sizeColumnsToFit();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <div style={{ overflow: "hidden", flexGrow: "1" }}>
            <div
              style={{
                height: "100%",
                width: "100%",
              }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                rowData={this.state.rowData}
                columnDefs={this.state.columnDefs}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>

          <div style={{ backgroundColor: "#ccc", padding: "2rem" }}>
            right side column
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
