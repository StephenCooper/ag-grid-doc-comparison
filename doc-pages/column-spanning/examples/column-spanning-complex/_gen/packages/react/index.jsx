"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Jan",
          field: "jan",
          colSpan: function (params) {
            if (isHeaderRow(params)) {
              return 6;
            } else if (isQuarterRow(params)) {
              return 3;
            } else {
              return 1;
            }
          },
          cellClassRules: cellClassRules,
        },
        { headerName: "Feb", field: "feb" },
        { headerName: "Mar", field: "mar" },
        {
          headerName: "Apr",
          field: "apr",
          colSpan: function (params) {
            if (isQuarterRow(params)) {
              return 3;
            } else {
              return 1;
            }
          },
          cellClassRules: cellClassRules,
        },
        { headerName: "May", field: "may" },
        { headerName: "Jun", field: "jun" },
      ],
      getRowHeight: function (params) {
        if (isHeaderRow(params)) {
          return 60;
        }
      },
      rowData: getData(),
      defaultColDef: {
        width: 100,
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
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
            getRowHeight={this.state.getRowHeight}
            rowData={this.state.rowData}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

var cellClassRules = {
  "header-cell": 'data.section === "big-title"',
  "quarters-cell": 'data.section === "quarters"',
};
function isHeaderRow(params) {
  return params.data.section === "big-title";
}
function isQuarterRow(params) {
  return params.data.section === "quarters";
}

render(<GridExample></GridExample>, document.querySelector("#root"));
