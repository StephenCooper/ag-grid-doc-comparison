"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";
import GenderRenderer from "./genderRenderer.jsx";
import MoodRenderer from "./moodRenderer.jsx";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowData: [
        { value: 14, type: "age" },
        { value: "female", type: "gender" },
        { value: "Happy", type: "mood" },
        { value: 21, type: "age" },
        { value: "male", type: "gender" },
        { value: "Sad", type: "mood" },
      ],
      columnDefs: [
        { field: "value" },
        {
          headerName: "Rendered Value",
          field: "value",
          cellRendererSelector: function (params) {
            const moodDetails = {
              component: MoodRenderer,
            };
            const genderDetails = {
              component: GenderRenderer,
              params: { values: ["Male", "Female"] },
            };
            if (params.data.type === "gender") return genderDetails;
            else if (params.data.type === "mood") return moodDetails;
            else return undefined;
          },
        },
        { field: "type" },
      ],
      defaultColDef: {
        flex: 1,
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
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
