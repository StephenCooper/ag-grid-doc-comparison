"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CsvExportModule } from "@ag-grid-community/csv-export";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultColDef: {
        editable: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      popupParent: document.body,
      columnDefs: [{ field: "make" }, { field: "model" }, { field: "price" }],
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 },
      ],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onBtnExport = () => {
    this.gridApi.exportDataAsCsv();
  };

  onBtnUpdate = () => {
    document.querySelector("#csvResult").value = this.gridApi.getDataAsCsv();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ margin: "10px 0" }}>
            <button onClick={() => this.onBtnUpdate()}>
              Show CSV export content text
            </button>
            <button onClick={() => this.onBtnExport()}>
              Download CSV export file
            </button>
          </div>
          <div style={{ flex: "1 1 0", position: "relative" }}>
            <div id="gridContainer">
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
                className="ag-theme-alpine"
              >
                <AgGridReact
                  defaultColDef={this.state.defaultColDef}
                  suppressExcelExport={true}
                  popupParent={this.state.popupParent}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  onGridReady={this.onGridReady}
                />
              </div>
            </div>
            <textarea id="csvResult">
              Click the Show CSV export content button to view exported CSV here
            </textarea>
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
