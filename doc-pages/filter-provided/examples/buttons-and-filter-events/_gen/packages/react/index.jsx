"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: "athlete",
          filter: "agTextColumnFilter",
          filterParams: {
            buttons: ["reset", "apply"],
          },
        },
        {
          field: "age",
          maxWidth: 100,
          filter: "agNumberColumnFilter",
          filterParams: {
            buttons: ["apply", "reset"],
            closeOnApply: true,
          },
        },
        {
          field: "country",
          filter: "agTextColumnFilter",
          filterParams: {
            buttons: ["clear", "apply"],
          },
        },
        {
          field: "year",
          filter: "agNumberColumnFilter",
          filterParams: {
            buttons: ["apply", "cancel"],
            closeOnApply: true,
          },
          maxWidth: 100,
        },
        { field: "sport" },
        { field: "gold", filter: "agNumberColumnFilter" },
        { field: "silver", filter: "agNumberColumnFilter" },
        { field: "bronze", filter: "agNumberColumnFilter" },
        { field: "total", filter: "agNumberColumnFilter" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
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

  onFilterOpened = (e) => {
    console.log("onFilterOpened", e);
  };

  onFilterChanged = (e) => {
    console.log("onFilterChanged", e);
    console.log("gridApi.getFilterModel() =>", e.api.getFilterModel());
  };

  onFilterModified = (e) => {
    console.log("onFilterModified", e);
    console.log("filterInstance.getModel() =>", e.filterInstance.getModel());
    console.log(
      "filterInstance.getModelFromUi() =>",
      e.filterInstance.getModelFromUi()
    );
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
            onGridReady={this.onGridReady}
            onFilterOpened={this.onFilterOpened.bind(this)}
            onFilterChanged={this.onFilterChanged.bind(this)}
            onFilterModified={this.onFilterModified.bind(this)}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
