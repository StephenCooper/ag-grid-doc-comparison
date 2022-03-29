"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "athlete", filter: "agTextColumnFilter", minWidth: 200 },
        { field: "age" },
        { field: "country", minWidth: 200 },
        { field: "year" },
        { field: "date", minWidth: 160 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        // allow every column to be aggregated
        enableValue: true,
        // allow every column to be grouped
        enableRowGroup: true,
        // allow every column to be pivoted
        enablePivot: true,
        sortable: true,
        filter: true,
      },
      sideBar: {
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
          },
          {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel",
          },
        ],
        defaultToolPanel: "filters",
        hiddenByDefault: true,
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

  setSideBarVisible = (value) => {
    this.gridApi.setSideBarVisible(value);
  };

  isSideBarVisible = () => {
    alert(this.gridApi.isSideBarVisible());
  };

  openToolPanel = (key) => {
    this.gridApi.openToolPanel(key);
  };

  closeToolPanel = () => {
    this.gridApi.closeToolPanel();
  };

  getOpenedToolPanel = () => {
    alert(this.gridApi.getOpenedToolPanel());
  };

  setSideBar = (def) => {
    this.gridApi.setSideBar(def);
  };

  getSideBar = () => {
    var sideBar = this.gridApi.getSideBar();
    alert(JSON.stringify(sideBar));
    console.log(sideBar);
  };

  setSideBarPosition = (position) => {
    this.gridApi.setSideBarPosition(position);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="parent-div">
          <div className="api-panel">
            <div className="api-column">
              Visibility
              <button onClick={() => this.setSideBarVisible(true)}>
                setSideBarVisible(true)
              </button>
              <button onClick={() => this.setSideBarVisible(false)}>
                setSideBarVisible(false)
              </button>
              <button onClick={() => this.isSideBarVisible()}>
                isSideBarVisible()
              </button>
            </div>
            <div className="api-column">
              Open &amp; Close
              <button onClick={() => this.openToolPanel("columns")}>
                openToolPanel('columns')
              </button>
              <button onClick={() => this.openToolPanel("filters")}>
                openToolPanel('filters')
              </button>
              <button onClick={() => this.closeToolPanel()}>
                closeToolPanel()
              </button>
              <button onClick={() => this.getOpenedToolPanel()}>
                getOpenedToolPanel()
              </button>
            </div>
            <div className="api-column">
              Reset
              <button onClick={() => this.setSideBar(["filters", "columns"])}>
                setSideBar(['filters','columns'])
              </button>
              <button onClick={() => this.setSideBar("columns")}>
                setSideBar('columns')
              </button>
              <button onClick={() => this.getSideBar()}>getSideBar()</button>
            </div>
            <div className="api-column">
              Position
              <button onClick={() => this.setSideBarPosition("left")}>
                setSideBarPosition('left')
              </button>
              <button onClick={() => this.setSideBarPosition("right")}>
                setSideBarPosition('right')
              </button>
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

render(<GridExample></GridExample>, document.querySelector("#root"));
