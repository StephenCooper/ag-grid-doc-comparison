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
        { field: "athlete", minWidth: 180 },
        { field: "age" },
        { field: "country", minWidth: 150 },
        { headerName: "Group", valueGetter: "data.country.charAt(0)" },
        { field: "year" },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 180 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      params.api.setRowData(data.slice(0, 100));
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  getDisplayedRowAtIndex = () => {
    var rowNode = this.gridApi.getDisplayedRowAtIndex(0);
    console.log(
      "getDisplayedRowAtIndex(0) => " +
        rowNode.data.athlete +
        " " +
        rowNode.data.year
    );
  };

  getDisplayedRowCount = () => {
    var count = this.gridApi.getDisplayedRowCount();
    console.log("getDisplayedRowCount() => " + count);
  };

  printAllDisplayedRows = () => {
    var count = this.gridApi.getDisplayedRowCount();
    console.log("## printAllDisplayedRows");
    for (var i = 0; i < count; i++) {
      var rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      console.log("row " + i + " is " + rowNode.data.athlete);
    }
  };

  printPageDisplayedRows = () => {
    var rowCount = this.gridApi.getDisplayedRowCount();
    var lastGridIndex = rowCount - 1;
    var currentPage = this.gridApi.paginationGetCurrentPage();
    var pageSize = this.gridApi.paginationGetPageSize();
    var startPageIndex = currentPage * pageSize;
    var endPageIndex = (currentPage + 1) * pageSize - 1;
    if (endPageIndex > lastGridIndex) {
      endPageIndex = lastGridIndex;
    }
    console.log("## printPageDisplayedRows");
    for (var i = startPageIndex; i <= endPageIndex; i++) {
      var rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      console.log("row " + i + " is " + rowNode.data.athlete);
    }
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.getDisplayedRowAtIndex()}>
              Get Displayed Row 0
            </button>
            <button onClick={() => this.getDisplayedRowCount()}>
              Get Displayed Row Count
            </button>
            <button onClick={() => this.printAllDisplayedRows()}>
              Print All Displayed Rows
            </button>
            <button onClick={() => this.printPageDisplayedRows()}>
              Print Page Displayed Rows
            </button>
          </div>

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
              pagination={true}
              paginationAutoPageSize={true}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
