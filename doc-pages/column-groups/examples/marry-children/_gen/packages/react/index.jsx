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
          headerName: "Athlete Details",
          marryChildren: true,
          children: [
            { field: "athlete", colId: "athlete" },
            { field: "country", colId: "country" },
          ],
        },
        { field: "age", colId: "age" },
        {
          headerName: "Sports Results",
          marryChildren: true,
          children: [
            { field: "sport", colId: "sport" },
            { field: "total", colId: "total" },
            { field: "gold", colId: "gold" },
            { field: "silver", colId: "silver" },
            { field: "bronze", colId: "bronze" },
          ],
        },
      ],
      defaultColDef: {
        resizable: true,
        width: 160,
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
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
