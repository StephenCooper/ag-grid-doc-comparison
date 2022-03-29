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
          field: "athlete",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter",
                filterParams: {
                  buttons: ["apply", "clear"],
                },
              },
              {
                filter: "agSetColumnFilter",
              },
            ],
          },
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        menuTabs: ["filterMenuTab"],
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

  getTextModel = () => {
    var textFilter = this.gridApi
      .getFilterInstance("athlete")
      .getChildFilterInstance(0);
    console.log("Current Text Filter model: ", textFilter.getModel());
  };

  getSetMiniFilter = () => {
    var setFilter = this.gridApi
      .getFilterInstance("athlete")
      .getChildFilterInstance(1);
    console.log("Current Set Filter search text: ", setFilter.getMiniFilter());
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => this.getTextModel()}>
              Print Text Filter model
            </button>
            <button onClick={() => this.getSetMiniFilter()}>
              Print Set Filter search text
            </button>
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
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
