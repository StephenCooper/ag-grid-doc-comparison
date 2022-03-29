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
        { headerName: "Row ID", valueGetter: "node.id" },
        { field: "make" },
        { field: "model" },
        { field: "price" },
      ],
      rowData: [
        { id: "c1", make: "Toyota", model: "Celica", price: 35000 },
        { id: "c2", make: "Ford", model: "Mondeo", price: 32000 },
        { id: "c8", make: "Porsche", model: "Boxter", price: 72000 },
        { id: "c4", make: "BMW", model: "M50", price: 60000 },
        { id: "c14", make: "Aston Martin", model: "DBX", price: 190000 },
      ],
      getRowId: (params) => params.data.id,
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
            rowData={this.state.rowData}
            getRowId={this.state.getRowId}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
