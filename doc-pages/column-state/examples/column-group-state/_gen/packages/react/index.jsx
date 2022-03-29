"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Athlete",
          children: [
            { field: "athlete" },
            { field: "country", columnGroupShow: "open" },
            { field: "sport", columnGroupShow: "open" },
            { field: "year", columnGroupShow: "open" },
            { field: "date", columnGroupShow: "open" },
          ],
        },
        {
          headerName: "Medals",
          children: [
            { field: "total", columnGroupShow: "closed" },
            { field: "gold", columnGroupShow: "open" },
            { field: "silver", columnGroupShow: "open" },
            { field: "bronze", columnGroupShow: "open" },
          ],
        },
      ],
      defaultColDef: {
        width: 150,
        resizable: true,
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

  saveState = () => {
    window.groupState = this.gridColumnApi.getColumnGroupState();
    console.log("group state saved", window.groupState);
    console.log("column state saved");
  };

  restoreState = () => {
    if (!window.groupState) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }
    this.gridColumnApi.setColumnGroupState(window.groupState);
    console.log("column state restored");
  };

  resetState = () => {
    this.gridColumnApi.resetColumnGroupState();
    console.log("column state reset");
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="test-container">
          <div className="test-header">
            <div className="example-section">
              Column State:
              <button onClick={() => this.saveState()}>Save State</button>
              <button onClick={() => this.restoreState()}>Restore State</button>
              <button onClick={() => this.resetState()}>Reset State</button>
            </div>
          </div>
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
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
