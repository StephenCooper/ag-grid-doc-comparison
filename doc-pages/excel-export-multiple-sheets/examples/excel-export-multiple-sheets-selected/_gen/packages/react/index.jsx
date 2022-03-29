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
        { field: "athlete", minWidth: 200 },
        { field: "age" },
        { field: "country", minWidth: 200 },
        { field: "year" },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      rowSelection: "multiple",
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

  onBtExport = () => {
    var spreadsheets = [];
    this.gridApi.forEachNode((node, index) => {
      if (index % 100 === 0) {
        this.gridApi.deselectAll();
      }
      node.setSelected(true);
      if (index % 100 === 99) {
        spreadsheets.push(
          this.gridApi.getSheetDataForExcel({
            onlySelected: true,
          })
        );
      }
    });
    // check if the last page was exported
    if (this.gridApi.getSelectedNodes().length) {
      spreadsheets.push(
        this.gridApi.getSheetDataForExcel({
          onlySelected: true,
        })
      );
      this.gridApi.deselectAll();
    }
    this.gridApi.exportMultipleSheetsAsExcel({
      data: spreadsheets,
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="container">
          <div>
            <button
              onClick={() => this.onBtExport()}
              style={{ marginBottom: "5px", fontWeight: "bold" }}
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
                rowSelection={this.state.rowSelection}
                onGridReady={this.onGridReady}
                rowData={this.state.rowData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
