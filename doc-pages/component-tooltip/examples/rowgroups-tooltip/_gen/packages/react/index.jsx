"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "country", width: 120, rowGroup: true },
        { field: "year", width: 90, rowGroup: true },
        { field: "sport", width: 110 },
        { field: "athlete", width: 200 },
        { field: "gold", width: 100 },
        { field: "silver", width: 100 },
        { field: "bronze", width: 100 },
        { field: "total", width: 100 },
        { field: "age", width: 90 },
        { field: "date", width: 110 },
      ],
      autoGroupColumnDef: {
        headerTooltip: "Group",
        minWidth: 190,
        tooltipValueGetter: (params) => {
          const count = params.node && params.node.allChildrenCount;
          if (count != null) {
            return params.value + " (" + count + ")";
          }
          return params.value;
        },
      },
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

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
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            defaultColDef={this.state.defaultColDef}
            animateRows={true}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
