"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class NumberFilter {
  constructor() {
    NumberFilter.prototype.__init.call(this);
  }

  __init() {
    this.filterText = null;
  }

  init(params) {
    this.filterParams = params;
    this.filterText = null;
    this.params = params;
    this.setupGui();
  }

  // not called by AG Grid, just for us to help setup
  setupGui() {
    this.gui = document.createElement("div");
    this.gui.innerHTML =
      '<div style="padding: 4px;">' +
      '<div style="font-weight: bold;">Greater than: </div>' +
      '<div><input style="margin: 4px 0px 4px 0px;" type="number" id="filterText" placeholder="Number of medals..."/></div>' +
      "</div>";

    this.onFilterChanged = () => {
      this.extractFilterText();
      this.params.filterChangedCallback();
    };

    this.eFilterText = this.gui.querySelector("#filterText");
    this.eFilterText.addEventListener("input", this.onFilterChanged);
  }

  extractFilterText() {
    this.filterText = this.eFilterText.value;
  }

  getGui() {
    return this.gui;
  }

  doesFilterPass(params) {
    if (!this.isFilterActive()) {
      return false;
    }

    const { api, colDef, column, columnApi, context } = this.filterParams;
    const { node } = params;
    const value = this.filterParams.valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data: node.data,
      getValue: (field) => node.data[field],
      node,
    });

    const filterValue = this.filterText;

    if (!value) return false;
    return Number(value) > Number(filterValue);
  }

  isFilterActive() {
    return (
      this.filterText !== null &&
      this.filterText !== undefined &&
      this.filterText !== "" &&
      isNumeric(this.filterText)
    );
  }

  getModel() {
    return this.isFilterActive() ? Number(this.eFilterText.value) : null;
  }

  setModel(model) {
    this.eFilterText.value = model;
    this.extractFilterText();
  }

  destroy() {
    this.eFilterText.removeEventListener("input", this.onFilterChanged);
  }

  getModelAsString() {
    return this.isFilterActive() ? ">" + this.filterText : "";
  }
}

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "athlete", width: 150, filter: false },
        {
          field: "gold",
          width: 100,
          filter: NumberFilter,
          suppressMenu: true,
        },
        {
          field: "silver",
          width: 100,
          filter: NumberFilter,
          suppressMenu: true,
        },
        {
          field: "bronze",
          width: 100,
          filter: NumberFilter,
          suppressMenu: true,
        },
        {
          field: "total",
          width: 100,
          filter: NumberFilter,
          suppressMenu: true,
        },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      rowData: null,
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

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(parseFloat(n));

render(<GridExample></GridExample>, document.querySelector("#root"));
