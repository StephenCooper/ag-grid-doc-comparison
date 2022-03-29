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
        { headerName: "Name", field: "athlete", minWidth: 200 },
        { field: "age", enableRowGroup: true },
        { field: "country", minWidth: 200 },
        { field: "year" },
        { field: "date", suppressColumnsToolPanel: true, minWidth: 180 },
        { field: "sport", minWidth: 200 },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
        { field: "total", aggFunc: "sum" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        enablePivot: true,
      },
      sideBar: {
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
              suppressPivots: true,
              suppressPivotMode: true,
              suppressColumnFilter: true,
              suppressColumnSelectAll: true,
              suppressColumnExpandAll: true,
            },
          },
        ],
        defaultToolPanel: "columns",
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

  showPivotModeSection = () => {
    var columnToolPanel = this.gridApi.getToolPanelInstance("columns");
    columnToolPanel.setPivotModeSectionVisible(true);
  };

  showRowGroupsSection = () => {
    var columnToolPanel = this.gridApi.getToolPanelInstance("columns");
    columnToolPanel.setRowGroupsSectionVisible(true);
  };

  showValuesSection = () => {
    var columnToolPanel = this.gridApi.getToolPanelInstance("columns");
    columnToolPanel.setValuesSectionVisible(true);
  };

  showPivotSection = () => {
    var columnToolPanel = this.gridApi.getToolPanelInstance("columns");
    columnToolPanel.setPivotSectionVisible(true);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div>
            <span className="button-group">
              <button onClick={() => this.showPivotModeSection()}>
                Show Pivot Mode Section
              </button>
              <button onClick={() => this.showRowGroupsSection()}>
                Show Row Groups Section
              </button>
              <button onClick={() => this.showValuesSection()}>
                Show Values Section
              </button>
              <button onClick={() => this.showPivotSection()}>
                Show Pivot Section
              </button>
            </span>
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
