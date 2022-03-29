"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";
import CustomCellRenderer from "./customCellRenderer.jsx";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: "athlete",
          cellClass: "custom-athlete-cell",
          cellRenderer: CustomCellRenderer,
        },
        { field: "country" },
        { field: "year", width: 100 },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
      ],
      defaultColDef: {
        width: 170,
        sortable: true,
        filter: true,
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

  onRowDragEnter = (e) => {
    console.log("onRowDragEnter", e);
  };

  onRowDragEnd = (e) => {
    console.log("onRowDragEnd", e);
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
            rowDragManaged={true}
            animateRows={true}
            onGridReady={this.onGridReady}
            onRowDragEnter={this.onRowDragEnter.bind(this)}
            onRowDragEnd={this.onRowDragEnd.bind(this)}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
