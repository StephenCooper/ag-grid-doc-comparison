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
      rowData: getRowData(),
      columnDefs: [
        {
          headerName: "Set Filter Column",
          field: "col1",
          filter: "agSetColumnFilter",
          flex: 1,
          editable: true,
        },
      ],
      sideBar: "filters",
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    params.api.getToolPanelInstance("filters").expandFilters();
  };

  reset = () => {
    this.gridApi.setFilterModel(null);
    this.gridApi.setRowData(getRowData());
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.reset()}>Reset</button>
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              rowData={this.state.rowData}
              columnDefs={this.state.columnDefs}
              sideBar={this.state.sideBar}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getRowData() {
  return [
    { col1: "A" },
    { col1: "A" },
    { col1: "B" },
    { col1: "B" },
    { col1: "C" },
    { col1: "C" },
  ];
}

render(<GridExample></GridExample>, document.querySelector("#root"));
