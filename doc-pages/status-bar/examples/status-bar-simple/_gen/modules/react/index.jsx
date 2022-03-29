"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
import React, { Component } from "react";
import { render } from "react-dom";

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
        { field: "athlete", minWidth: 200 },
        { field: "age", filter: "agNumberColumnFilter" },
        { field: "country", minWidth: 200 },
        { field: "year" },
        { field: "date", minWidth: 180 },
        { field: "sport", minWidth: 200 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      rowSelection: "multiple",
      statusBar: {
        statusPanels: [
          { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
          { statusPanel: "agTotalRowCountComponent", align: "center" },
          { statusPanel: "agFilteredRowCountComponent" },
          { statusPanel: "agSelectedRowCountComponent" },
          { statusPanel: "agAggregationComponent" },
        ],
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
            enableRangeSelection={true}
            rowSelection={this.state.rowSelection}
            statusBar={this.state.statusBar}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
