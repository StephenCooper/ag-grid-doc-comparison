"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "q1", type: "quarterFigure" },
        { field: "q2", type: "quarterFigure" },
        { field: "q3", type: "quarterFigure" },
        { field: "q4", type: "quarterFigure" },
        { field: "year", rowGroup: true, hide: true },
        {
          headerName: "Total",
          colId: "total",
          cellClass: ["number-cell", "total-col"],
          aggFunc: "sum",
          valueFormatter: formatNumber,
          valueGetter: totalValueGetter,
        },
        {
          headerName: "Total x 10",
          cellClass: ["number-cell", "total-col"],
          aggFunc: "sum",
          minWidth: 120,
          valueFormatter: formatNumber,
          valueGetter: total10ValueGetter,
        },
      ],
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 130,
      },
      columnTypes: {
        quarterFigure: {
          editable: true,
          cellClass: "number-cell",
          aggFunc: "sum",
          valueFormatter: formatNumber,
          valueParser: function numberParser(params) {
            return Number(params.newValue);
          },
        },
      },
      rowData: getData(),
      groupDefaultExpanded: 1,
      getRowId: function (params) {
        return params.data.id;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onExpireValueCache = () => {
    console.log("onInvalidateValueCache -> start");
    this.gridApi.expireValueCache();
    console.log("onInvalidateValueCache -> end");
  };

  onRefreshCells = () => {
    console.log("onRefreshCells -> start");
    this.gridApi.refreshCells();
    console.log("onRefreshCells -> end");
  };

  onUpdateOneValue = () => {
    var randomId = Math.floor(Math.random() * 10) + "";
    var rowNode = this.gridApi.getRowNode(randomId);
    if (rowNode) {
      var randomCol = ["q1", "q2", "q3", "q4"][Math.floor(Math.random() * 4)];
      var newValue = Math.floor(Math.random() * 1000);
      console.log("onUpdateOneValue -> start");
      rowNode.setDataValue(randomCol, newValue);
      console.log("onUpdateOneValue -> end");
    }
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.onExpireValueCache()}>
              Invalidate Value Cache
            </button>
            <button onClick={() => this.onRefreshCells()}>Refresh Cells</button>
            <button onClick={() => this.onUpdateOneValue()}>
              Update One Value
            </button>
          </div>

          <div
            style={{
              height: "100%",
              width: "100%",
            }}
            className="ag-theme-alpine-dark"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.rowData}
              suppressAggFuncInHeader={true}
              enableCellChangeFlash={true}
              enableRangeSelection={true}
              groupDefaultExpanded={this.state.groupDefaultExpanded}
              valueCache={true}
              getRowId={this.state.getRowId}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

var callCount = 1;
var totalValueGetter = function (params) {
  var q1 = params.getValue("q1");
  var q2 = params.getValue("q2");
  var q3 = params.getValue("q3");
  var q4 = params.getValue("q4");
  var result = q1 + q2 + q3 + q4;
  console.log(
    `Total Value Getter (${callCount}, ${params.column.getId()}): ${[
      q1,
      q2,
      q3,
      q4,
    ].join(", ")} = ${result}`
  );
  callCount++;
  return result;
};
var total10ValueGetter = function (params) {
  var total = params.getValue("total");
  return total * 10;
};
function formatNumber(params) {
  var number = params.value;
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

render(<GridExample></GridExample>, document.querySelector("#root"));
