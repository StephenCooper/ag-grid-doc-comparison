"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import MultilineCellRenderer from "./multilineCellRenderer.jsx";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "address" },
        {
          headerName: "Custom column",
          autoHeight: true,
          valueGetter: function (param) {
            return param.data.col1 + "\n" + param.data.col2;
          },
          cellRenderer: MultilineCellRenderer,
        },
      ],
      defaultColDef: {
        sortable: true,
        cellClass: "multiline",
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      rowData: [
        {
          address:
            "1197 Thunder Wagon Common,\nCataract, RI, \n02987-1016, US, \n(401) 747-0763",
          col1: "abc",
          col2: "xyz",
        },
        {
          address:
            "3685 Rocky Glade, Showtucket, NU, \nX1E-9I0, CA, \n(867) 371-4215",
          col1: "abc",
          col2: "xyz",
        },
        {
          address:
            "3235 High Forest, Glen Campbell, MS, \n39035-6845, US, \n(601) 638-8186",
          col1: "abc",
          col2: "xyz",
        },
        {
          address:
            "2234 Sleepy Pony Mall , Drain, DC, \n20078-4243, US, \n(202) 948-3634",
          col1: "abc",
          col2: "xyz",
        },
      ],
      excelStyles: [
        {
          id: "multiline",
          alignment: {
            wrapText: true,
          },
        },
      ],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onBtExport = () => {
    this.gridApi.exportDataAsExcel();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="container">
          <div>
            <button
              onClick={() => this.onBtExport()}
              style={{ margin: "5px 0px", fontWeight: "bold" }}
            >
              Export to Excel
            </button>
          </div>
          <div className="grid-wrapper">
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
                excelStyles={this.state.excelStyles}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
