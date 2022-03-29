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
      defaultColDef: {
        initialWidth: 100,
        sortable: true,
        resizable: true,
      },
      columnDefs: getColumnDefs(),
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

  onBtWithDefault = () => {
    this.gridApi.setColumnDefs(getColumnDefs());
  };

  onBtRemove = () => {
    this.gridApi.setColumnDefs([]);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="test-container">
          <div className="test-header">
            <button onClick={() => this.onBtWithDefault()}>
              Set Columns with Initials
            </button>
            <button onClick={() => this.onBtRemove()}>Remove Columns</button>
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              defaultColDef={this.state.defaultColDef}
              columnDefs={this.state.columnDefs}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getColumnDefs() {
  return [
    { field: "athlete", initialWidth: 100, initialSort: "asc" },
    { field: "age" },
    { field: "country", initialPinned: "left" },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
}

render(<GridExample></GridExample>, document.querySelector("#root"));
