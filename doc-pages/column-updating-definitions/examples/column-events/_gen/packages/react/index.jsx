"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultColDef: {
        sortable: true,
        resizable: true,
        width: 150,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
      },
      columnDefs: getColumnDefs(),
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

  onSortChanged = (e) => {
    console.log("Event Sort Changed", e);
  };

  onColumnResized = (e) => {
    console.log("Event Column Resized", e);
  };

  onColumnVisible = (e) => {
    console.log("Event Column Visible", e);
  };

  onColumnPivotChanged = (e) => {
    console.log("Event Pivot Changed", e);
  };

  onColumnRowGroupChanged = (e) => {
    console.log("Event Row Group Changed", e);
  };

  onColumnValueChanged = (e) => {
    console.log("Event Value Changed", e);
  };

  onColumnMoved = (e) => {
    console.log("Event Column Moved", e);
  };

  onColumnPinned = (e) => {
    console.log("Event Column Pinned", e);
  };

  onBtSortOn = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      if (colDef.field === "age") {
        colDef.sort = "desc";
      }
      if (colDef.field === "athlete") {
        colDef.sort = "asc";
      }
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtSortOff = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      colDef.sort = null;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtWidthNarrow = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      if (colDef.field === "age" || colDef.field === "athlete") {
        colDef.width = 100;
      }
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtWidthNormal = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      colDef.width = 200;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtHide = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      if (colDef.field === "age" || colDef.field === "athlete") {
        colDef.hide = true;
      }
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtShow = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      colDef.hide = false;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtPivotOn = () => {
    this.gridColumnApi.setPivotMode(true);
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      if (colDef.field === "country") {
        colDef.pivot = true;
      }
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtPivotOff = () => {
    this.gridColumnApi.setPivotMode(false);
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      colDef.pivot = false;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtRowGroupOn = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      if (colDef.field === "sport") {
        colDef.rowGroup = true;
      }
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtRowGroupOff = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      colDef.rowGroup = false;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtAggFuncOn = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      if (
        colDef.field === "gold" ||
        colDef.field === "silver" ||
        colDef.field === "bronze"
      ) {
        colDef.aggFunc = "sum";
      }
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtAggFuncOff = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      colDef.aggFunc = null;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtPinnedOn = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      if (colDef.field === "athlete") {
        colDef.pinned = "left";
      }
      if (colDef.field === "age") {
        colDef.pinned = "right";
      }
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  onBtPinnedOff = () => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      colDef.pinned = null;
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="test-container">
          <div className="test-header">
            <div className="test-button-row">
              <div className="test-button-group">
                <button onClick={() => this.onBtSortOn()}>Sort On</button>
                <br />
                <button onClick={() => this.onBtSortOff()}>Sort Off</button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtWidthNarrow()}>
                  Width Narrow
                </button>
                <br />
                <button onClick={() => this.onBtWidthNormal()}>
                  Width Normal
                </button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtHide()}>Hide Cols</button>
                <br />
                <button onClick={() => this.onBtShow()}>Show Cols</button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtPivotOn()}>Pivot On</button>
                <br />
                <button onClick={() => this.onBtPivotOff()}>Pivot Off</button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtRowGroupOn()}>
                  Row Group On
                </button>
                <br />
                <button onClick={() => this.onBtRowGroupOff()}>
                  Row Group Off
                </button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtAggFuncOn()}>
                  Agg Func On
                </button>
                <br />
                <button onClick={() => this.onBtAggFuncOff()}>
                  Agg Func Off
                </button>
              </div>
              <div className="test-button-group">
                <button onClick={() => this.onBtPinnedOn()}>Pinned On</button>
                <br />
                <button onClick={() => this.onBtPinnedOff()}>Pinned Off</button>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              defaultColDef={this.state.defaultColDef}
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
              onSortChanged={this.onSortChanged.bind(this)}
              onColumnResized={this.onColumnResized.bind(this)}
              onColumnVisible={this.onColumnVisible.bind(this)}
              onColumnPivotChanged={this.onColumnPivotChanged.bind(this)}
              onColumnRowGroupChanged={this.onColumnRowGroupChanged.bind(this)}
              onColumnValueChanged={this.onColumnValueChanged.bind(this)}
              onColumnMoved={this.onColumnMoved.bind(this)}
              onColumnPinned={this.onColumnPinned.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getColumnDefs() {
  return [
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
}

render(<GridExample></GridExample>, document.querySelector("#root"));
