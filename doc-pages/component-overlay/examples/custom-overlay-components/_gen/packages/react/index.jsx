"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CustomLoadingOverlay from "./customLoadingOverlay.jsx";
import CustomNoRowsOverlay from "./customNoRowsOverlay.jsx";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "athlete", width: 150 },
        { field: "age", width: 90 },
        { field: "country", width: 120 },
        { field: "year", width: 90 },
        { field: "date", width: 110 },
        { field: "sport", width: 110 },
        { field: "gold", width: 100 },
        { field: "silver", width: 100 },
        { field: "bronze", width: 100 },
        { field: "total", width: 100 },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      rowData: null,
      loadingOverlayComponent: CustomLoadingOverlay,
      loadingOverlayComponentParams: {
        loadingMessage: "One moment please...",
      },
      noRowsOverlayComponent: CustomNoRowsOverlay,
      noRowsOverlayComponentParams: {
        noRowsMessageFunc: () => "Sorry - no rows! at: " + new Date(),
      },
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

  onBtShowLoading = () => {
    this.gridApi.showLoadingOverlay();
  };

  onBtShowNoRows = () => {
    this.gridApi.showNoRowsOverlay();
  };

  onBtHide = () => {
    this.gridApi.hideOverlay();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.onBtShowLoading()}>
              Show Loading Overlay
            </button>
            <button onClick={() => this.onBtShowNoRows()}>
              Show No Rows Overlay
            </button>
            <button onClick={() => this.onBtHide()}>Hide Overlay</button>
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
              loadingOverlayComponent={this.state.loadingOverlayComponent}
              loadingOverlayComponentParams={
                this.state.loadingOverlayComponentParams
              }
              noRowsOverlayComponent={this.state.noRowsOverlayComponent}
              noRowsOverlayComponentParams={
                this.state.noRowsOverlayComponentParams
              }
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
