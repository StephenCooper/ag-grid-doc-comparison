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
        { field: "athlete" },
        { field: "age" },
        { field: "country" },
        { field: "year" },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        width: 150,
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

  onMedalsFirst = () => {
    this.gridColumnApi.moveColumns(["gold", "silver", "bronze", "total"], 0);
  };

  onMedalsLast = () => {
    this.gridColumnApi.moveColumns(["gold", "silver", "bronze", "total"], 6);
  };

  onCountryFirst = () => {
    this.gridColumnApi.moveColumn("country", 0);
  };

  onSwapFirstTwo = () => {
    this.gridColumnApi.moveColumnByIndex(0, 1);
  };

  onPrintColumns = () => {
    const cols = this.gridColumnApi.getAllGridColumns();
    const colToNameFunc = (col, index) => index + " = " + col.getId();
    const colNames = cols.map(colToNameFunc).join(", ");
    console.log("columns are: " + colNames);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => this.onMedalsFirst()}>Medals First</button>
            <button onClick={() => this.onMedalsLast()}>Medals Last</button>
            <button onClick={() => this.onCountryFirst()}>Country First</button>
            <button onClick={() => this.onSwapFirstTwo()}>
              Swap First Two
            </button>
            <button onClick={() => this.onPrintColumns()}>Print Columns</button>
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
              suppressDragLeaveHidesColumns={true}
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
