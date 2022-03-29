"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import ClickableStatusBarComponent from "./clickableStatusBarComponent.jsx";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  StatusBarModule,
  RangeSelectionModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: "row",
        },
        {
          field: "name",
        },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      rowData: [
        { row: "Row 1", name: "Michael Phelps" },
        { row: "Row 2", name: "Natalie Coughlin" },
        { row: "Row 3", name: "Aleksey Nemov" },
        { row: "Row 4", name: "Alicia Coutts" },
        { row: "Row 5", name: "Missy Franklin" },
        { row: "Row 6", name: "Ryan Lochte" },
        { row: "Row 7", name: "Allison Schmitt" },
        { row: "Row 8", name: "Natalie Coughlin" },
        { row: "Row 9", name: "Ian Thorpe" },
        { row: "Row 10", name: "Bob Mill" },
        { row: "Row 11", name: "Willy Walsh" },
        { row: "Row 12", name: "Sarah McCoy" },
        { row: "Row 13", name: "Jane Jack" },
        { row: "Row 14", name: "Tina Wills" },
      ],
      rowSelection: "multiple",
      statusBar: {
        statusPanels: [
          {
            statusPanel: ClickableStatusBarComponent,
            key: "statusBarCompKey",
          },
          {
            statusPanel: "agAggregationComponent",
            statusPanelParams: {
              aggFuncs: ["count", "sum"],
            },
          },
        ],
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };

  toggleStatusBarComp = () => {
    const statusBarComponent = this.gridApi.getStatusPanel("statusBarCompKey");
    statusBarComponent.setVisible(!statusBarComponent.isVisible());
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <button
          onClick={() => this.toggleStatusBarComp()}
          style={{ marginBottom: "10px" }}
        >
          Toggle Status Bar Component
        </button>
        <div
          style={{
            height: "90%",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            enableRangeSelection={true}
            rowSelection={this.state.rowSelection}
            statusBar={this.state.statusBar}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
