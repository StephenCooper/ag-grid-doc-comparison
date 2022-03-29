"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Editable A",
          field: "a",
          editable: true,
          valueParser: numberValueParser,
        },
        {
          headerName: "Editable B",
          field: "b",
          editable: true,
          valueParser: numberValueParser,
        },
        {
          headerName: "Editable C",
          field: "c",
          editable: true,
          valueParser: numberValueParser,
        },
        {
          headerName: "API D",
          field: "d",
          minWidth: 140,
          valueParser: numberValueParser,
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          headerName: "API E",
          field: "e",
          minWidth: 140,
          valueParser: numberValueParser,
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          headerName: "Total",
          minWidth: 140,
          valueGetter: "data.a + data.b + data.c + data.d + data.e",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          headerName: "Average",
          minWidth: 140,
          valueGetter: "(data.a + data.b + data.c + data.d + data.e) / 5",
          cellRenderer: "agAnimateSlideCellRenderer",
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        resizable: true,
        cellClass: "align-right",
        valueFormatter: function (params) {
          return formatNumber(params.value);
        },
      },
      rowData: createRowData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onUpdateSomeValues = () => {
    const rowCount = this.gridApi.getDisplayedRowCount();
    for (let i = 0; i < 10; i++) {
      const row = Math.floor(Math.random() * rowCount);
      const rowNode = this.gridApi.getDisplayedRowAtIndex(row);
      rowNode.setDataValue("d", Math.floor(Math.random() * 10000));
      rowNode.setDataValue("e", Math.floor(Math.random() * 10000));
    }
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.onUpdateSomeValues()}>
              Update Some D &amp; E Values
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
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

function numberValueParser(params) {
  return Number(params.newValue);
}
function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function createRowData() {
  const rowData = [];
  for (let i = 0; i < 20; i++) {
    rowData.push({
      a: Math.floor(((i + 323) * 25435) % 10000),
      b: Math.floor(((i + 323) * 23221) % 10000),
      c: Math.floor(((i + 323) * 468276) % 10000),
      d: 0,
      e: 0,
    });
  }
  return rowData;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
