"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SparklinesModule } from "@ag-grid-enterprise/sparklines";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule]);

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
              fill: "rgba(185,173,77,0.3)",
              line: {
                stroke: "rgb(185,173,77)",
              },
              highlightStyle: {
                size: 4,
                stroke: "rgb(185,173,77)",
                fill: "rgb(185,173,77)",
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
              type: "area",
              fill: "rgba(77,89,185, 0.3)",
              line: {
                stroke: "rgb(77,89,185)",
              },
              highlightStyle: {
                size: 4,
                stroke: "rgb(77,89,185)",
                fill: "rgb(77,89,185)",
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
