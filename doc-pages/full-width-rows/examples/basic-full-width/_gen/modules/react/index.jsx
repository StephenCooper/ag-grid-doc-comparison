"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { Component } from "react";
import { render } from "react-dom";
import FullWidthCellRenderer from "./fullWidthCellRenderer.jsx";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowData: createData(100, "body"),
      pinnedTopRowData: createData(3, "pinned"),
      pinnedBottomRowData: createData(3, "pinned"),
      columnDefs: getColumnDefs(),
      isFullWidthRow: function (params) {
        // in this example, we check the fullWidth attribute that we set
        // while creating the data. what check you do to decide if you
        // want a row full width is up to you, as long as you return a boolean
        // for this method.
        return params.rowNode.data.fullWidth;
      },
      fullWidthCellRenderer: FullWidthCellRenderer,
      getRowHeight: function (params) {
        // you can have normal rows and full width rows any height that you want
        const isBodyRow = params.node.rowPinned === undefined;
        const isFullWidth = params.node.data.fullWidth;
        if (isBodyRow && isFullWidth) {
          return 75;
        }
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
            rowData={this.state.rowData}
            pinnedTopRowData={this.state.pinnedTopRowData}
            pinnedBottomRowData={this.state.pinnedBottomRowData}
            columnDefs={this.state.columnDefs}
            isFullWidthRow={this.state.isFullWidthRow}
            fullWidthCellRenderer={this.state.fullWidthCellRenderer}
            getRowHeight={this.state.getRowHeight}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function getColumnDefs() {
  const columnDefs = [];
  alphabet().forEach(function (letter) {
    const colDef = {
      headerName: letter,
      field: letter,
      width: 150,
    };
    if (letter === "A") {
      colDef.pinned = "left";
    }
    if (letter === "Z") {
      colDef.pinned = "right";
    }
    columnDefs.push(colDef);
  });
  return columnDefs;
}
function alphabet() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
}
function createData(count, prefix) {
  const rowData = [];
  for (let i = 0; i < count; i++) {
    const item = {};
    // mark every third row as full width. how you mark the row is up to you,
    // in this example the example code (not the grid code) looks at the
    // fullWidth attribute in the isFullWidthRow() callback. how you determine
    // if a row is full width or not is totally up to you.
    item.fullWidth = i % 3 === 2;
    // put in a column for each letter of the alphabet
    alphabet().forEach(function (letter) {
      item[letter] = prefix + " (" + letter + "," + i + ")";
    });
    rowData.push(item);
  }
  return rowData;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
