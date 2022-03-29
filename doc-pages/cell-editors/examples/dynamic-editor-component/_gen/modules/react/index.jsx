"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import React, { Component } from "react";
import { render } from "react-dom";
import MoodEditor from "./moodEditor.jsx";
import NumericCellEditor from "./numericCellEditor.jsx";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
  RichSelectModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "type" },
        {
          field: "value",
          editable: true,
          cellEditorSelector: cellEditorSelector,
        },
      ],
      defaultColDef: {
        flex: 1,
      },
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onRowEditingStarted = (event) => {
    console.log("never called - not doing row editing");
  };

  onRowEditingStopped = (event) => {
    console.log("never called - not doing row editing");
  };

  onCellEditingStarted = (event) => {
    console.log("cellEditingStarted");
  };

  onCellEditingStopped = (event) => {
    console.log("cellEditingStopped");
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
            onRowEditingStarted={this.onRowEditingStarted.bind(this)}
            onRowEditingStopped={this.onRowEditingStopped.bind(this)}
            onCellEditingStarted={this.onCellEditingStarted.bind(this)}
            onCellEditingStopped={this.onCellEditingStopped.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function cellEditorSelector(params) {
  if (params.data.type === "age") {
    return {
      component: NumericCellEditor,
    };
  }
  if (params.data.type === "gender") {
    return {
      component: "agRichSelectCellEditor",
      params: {
        values: ["Male", "Female"],
      },
      popup: true,
    };
  }
  if (params.data.type === "mood") {
    return {
      component: MoodEditor,
      popup: true,
      popupPosition: "under",
    };
  }
  return undefined;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
