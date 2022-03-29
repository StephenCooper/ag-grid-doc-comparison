"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [{ field: "athlete", filter: "agSetColumnFilter" }],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
      },
      sideBar: "filters",
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

    params.api.getToolPanelInstance("filters").expandFilters();
  };

  getMiniFilterText = () => {
    const athleteFilter = this.gridApi.getFilterInstance("athlete");
    console.log(athleteFilter.getMiniFilter());
  };

  saveMiniFilterText = () => {
    const athleteFilter = this.gridApi.getFilterInstance("athlete");
    savedMiniFilterText = athleteFilter.getMiniFilter();
  };

  restoreMiniFilterText = () => {
    const athleteFilter = this.gridApi.getFilterInstance("athlete");
    athleteFilter.setMiniFilter(savedMiniFilterText);
  };

  resetFilter = () => {
    const athleteFilter = this.gridApi.getFilterInstance("athlete");
    athleteFilter.setModel(null);
    this.gridApi.onFilterChanged();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div className="example-header">
            <button onClick={() => this.getMiniFilterText()}>
              Get Mini Filter Text
            </button>
            <button onClick={() => this.saveMiniFilterText()}>
              Save Mini Filter Text
            </button>
            <button onClick={() => this.restoreMiniFilterText()}>
              Restore Mini Filter Text
            </button>
            <button onClick={() => this.resetFilter()}>Reset Filter</button>
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
              sideBar={this.state.sideBar}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

let savedMiniFilterText = "";

render(<GridExample></GridExample>, document.querySelector("#root"));
