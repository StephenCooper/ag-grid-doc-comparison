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
        {
          headerName: "Default",
          field: "animal",
          filter: "agSetColumnFilter",
        },
        {
          headerName: "Excel (Windows)",
          field: "animal",
          filter: "agSetColumnFilter",
          filterParams: {
            excelMode: "windows",
          },
        },
        {
          headerName: "Excel (Mac)",
          field: "animal",
          filter: "agSetColumnFilter",
          filterParams: {
            excelMode: "mac",
          },
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
      },
      sideBar: "filters",
      rowData: getData(),
      localeText: {
        applyFilter: "OK",
        cancelFilter: "Cancel",
        resetFilter: "Clear Filter",
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
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            sideBar={this.state.sideBar}
            rowData={this.state.rowData}
            localeText={this.state.localeText}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
