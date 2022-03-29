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
    const params = getParams();
    if (params.suppressQuotes) {
      alert(
        "NOTE: you are downloading a file with non-standard quotes - it may not render correctly in Excel."
      );
    }
    this.gridApi.exportDataAsCsv(params);
  };

  onBtnUpdate = () => {
    document.querySelector("#csvResult").value = this.gridApi.getDataAsCsv(
      getParams()
    );
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <div className="row">
                <label for="suppressQuotes">
                  <input type="checkbox" id="suppressQuotes" />
                  suppressQuotes
                </label>
              </div>
            </div>
          </div>

          <div style={{ margin: "10px 0" }}>
            <button onClick={() => this.onBtnUpdate()}>
              Show CSV export content text
            </button>
            <button onClick={() => this.onBtnExport()}>
              Download CSV export file
            </button>
          </div>

          <div style={{ flex: "1 1 0px", position: "relative" }}>
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

function getBoolean(inputSelector) {
  return !!document.querySelector(inputSelector).checked;
}
function getParams() {
  return {
    suppressQuotes: getBoolean("#suppressQuotes"),
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
