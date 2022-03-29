"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "athlete", minWidth: 150 },
        { field: "age", maxWidth: 90 },
        { field: "country", minWidth: 150 },
        { field: "year", maxWidth: 90 },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
      },
      rowSelection: "single",
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

  navigateToNextCell = (params) => {
    var suggestedNextCell = params.nextCellPosition;
    var KEY_UP = "ArrowUp";
    var KEY_DOWN = "ArrowDown";
    var noUpOrDownKeyPressed = params.key !== KEY_DOWN && params.key !== KEY_UP;
    if (noUpOrDownKeyPressed || !suggestedNextCell) {
      return suggestedNextCell;
    }
    params.api.forEachNode(function (node) {
      if (node.rowIndex === suggestedNextCell.rowIndex) {
        node.setSelected(true);
      }
    });
    return suggestedNextCell;
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
            rowSelection={this.state.rowSelection}
            rowData={this.state.rowData}
            navigateToNextCell={this.navigateToNextCell}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
