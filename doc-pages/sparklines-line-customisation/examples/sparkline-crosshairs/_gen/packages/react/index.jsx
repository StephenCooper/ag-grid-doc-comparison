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
              line: {
                stroke: "rgb(52, 168, 83)",
              },
              highlightStyle: {
                size: 4,
                stroke: "rgb(52, 168, 83)",
                fill: "rgb(52, 168, 83)",
              },
              tooltip: {
                renderer: renderer,
              },
              crosshairs: {
                xLine: {
                  enabled: true,
                  lineDash: "dash",
                  stroke: "rgba(0, 0, 0, 0.5)",
                },
                yLine: {
                  enabled: true,
                  lineDash: "dash",
                  stroke: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          },
        },
        {
          field: "rateOfChange",
          cellRenderer: "agSparklineCellRenderer",
          cellRendererParams: {
            sparklineOptions: {
              line: {
                stroke: "rgb(168,52,137)",
              },
              highlightStyle: {
                size: 4,
                stroke: "rgb(168,52,137)",
                fill: "rgb(168,52,137)",
              },
              tooltip: {
                renderer: renderer,
              },
              crosshairs: {
                xLine: {
                  enabled: false,
                },
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

function renderer(params) {
  return {
    backgroundColor: "black",
    opacity: 0.5,
    color: "white",
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
