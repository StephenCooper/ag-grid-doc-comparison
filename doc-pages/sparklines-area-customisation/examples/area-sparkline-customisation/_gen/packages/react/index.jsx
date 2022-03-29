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
        { field: "symbol", maxWidth: 120 },
        { field: "name", minWidth: 250 },
        {
          field: "change",
          cellRenderer: "agSparklineCellRenderer",
          cellRendererParams: {
            sparklineOptions: {
              type: "area",
              fill: "rgba(216, 204, 235, 0.3)",
              line: {
                stroke: "rgb(119,77,185)",
              },
              highlightStyle: {
                fill: "rgb(143,185,77)",
              },
              axis: {
                stroke: "rgb(204, 204, 235)",
              },
            },
          },
        },
        {
          field: "volume",
          type: "numericColumn",
          maxWidth: 140,
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowData: getData(),
      rowHeight: 50,
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
            rowHeight={this.state.rowHeight}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
