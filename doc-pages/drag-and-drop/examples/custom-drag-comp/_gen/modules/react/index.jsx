"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { Component } from "react";
import { render } from "react-dom";
import DragSourceRenderer from "./dragSourceRenderer.jsx";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowClassRules: {
        "red-row": 'data.color == "Red"',
        "green-row": 'data.color == "Green"',
        "blue-row": 'data.color == "Blue"',
      },
      defaultColDef: {
        width: 80,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowData: getData(),
      columnDefs: [
        { cellRenderer: DragSourceRenderer, minWidth: 100 },
        { field: "id" },
        { field: "color" },
        { field: "value1" },
        { field: "value2" },
      ],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onDragOver = (event) => {
    var types = event.dataTransfer.types;
    var dragSupported = types.length;
    if (dragSupported) {
      event.dataTransfer.dropEffect = "move";
    }
    event.preventDefault();
  };

  onDrop = (event) => {
    event.preventDefault();
    var textData = event.dataTransfer.getData("text/plain");
    var eJsonRow = document.createElement("div");
    eJsonRow.classList.add("json-row");
    eJsonRow.innerText = textData;
    var eJsonDisplay = document.querySelector("#eJsonDisplay");
    eJsonDisplay.appendChild(eJsonRow);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="outer">
          <div className="grid-col">
            <div
              style={{
                height: "100%",
                width: "100%",
              }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                rowClassRules={this.state.rowClassRules}
                defaultColDef={this.state.defaultColDef}
                rowData={this.state.rowData}
                rowDragManaged={true}
                columnDefs={this.state.columnDefs}
                animateRows={true}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>

          <div
            className="drop-col"
            onDragOver={() => this.onDragOver(event)}
            onDrop={() => this.onDrop(event)}
          >
            <span id="eDropTarget" className="drop-target">
              ==&gt; Drop to here
            </span>
            <div id="eJsonDisplay" className="json-display"></div>
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
