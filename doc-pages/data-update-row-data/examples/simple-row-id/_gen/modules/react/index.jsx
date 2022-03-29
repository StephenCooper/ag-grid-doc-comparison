"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [{ field: "make" }, { field: "model" }, { field: "price" }],
      rowData: rowDataA,
      rowSelection: "single",
      getRowId: (params) => params.data.id,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onRowDataA = () => {
    this.gridApi.setRowData(rowDataA);
  };

  onRowDataB = () => {
    this.gridApi.setRowData(rowDataB);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ marginBottom: "5px", minHeight: "30px" }}>
            <button onClick={() => this.onRowDataA()}>Row Data A</button>
            <button onClick={() => this.onRowDataB()}>Row Data B</button>
          </div>
          <div style={{ flex: "1 1 0px" }}>
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
                rowSelection={this.state.rowSelection}
                animateRows={true}
                getRowId={this.state.getRowId}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// specify the data
var rowDataA = [
  { id: "1", make: "Toyota", model: "Celica", price: 35000 },
  { id: "4", make: "BMW", model: "M50", price: 60000 },
  { id: "5", make: "Aston Martin", model: "DBX", price: 190000 },
];
var rowDataB = [
  { id: "1", make: "Toyota", model: "Celica", price: 35000 },
  { id: "2", make: "Ford", model: "Mondeo", price: 32000 },
  { id: "3", make: "Porsche", model: "Boxter", price: 72000 },
  { id: "4", make: "BMW", model: "M50", price: 60000 },
  { id: "5", make: "Aston Martin", model: "DBX", price: 190000 },
];

render(<GridExample></GridExample>, document.querySelector("#root"));
