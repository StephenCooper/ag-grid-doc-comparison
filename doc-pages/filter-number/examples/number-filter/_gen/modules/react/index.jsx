"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: "sale",
          headerName: "Sale ($)",
          filter: "agNumberColumnFilter",
          floatingFilter: true,
          valueFormatter: numberValueFormatter,
        },
        {
          field: "sale",
          headerName: "Sale",
          filter: "agNumberColumnFilter",
          floatingFilter: true,
          filterParams: saleFilterParams,
          valueFormatter: saleValueFormatter,
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
      },
      rowData: getData(),
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
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

var numberValueFormatter = function (params) {
  return params.value.toFixed(2);
};
var saleFilterParams = {
  allowedCharPattern: "\\d\\-\\,\\$",
  numberParser: function (text) {
    return text == null
      ? null
      : parseFloat(text.replace(",", ".").replace("$", ""));
  },
};
var saleValueFormatter = function (params) {
  var formatted = params.value.toFixed(2).replace(".", ",");
  if (formatted.indexOf("-") === 0) {
    return "-$" + formatted.slice(1);
  }
  return "$" + formatted;
};

render(<GridExample></GridExample>, document.querySelector("#root"));
