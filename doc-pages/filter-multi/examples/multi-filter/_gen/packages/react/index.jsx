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
      columnDefs: [
        { field: "athlete", filter: "agMultiColumnFilter" },
        {
          field: "country",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter",
                filterParams: {
                  defaultOption: "startsWith",
                },
              },
              {
                filter: "agSetColumnFilter",
              },
            ],
          },
        },
        {
          field: "gold",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agNumberColumnFilter",
              },
              {
                filter: "agSetColumnFilter",
              },
            ],
          },
        },
        {
          field: "date",
          filter: "agMultiColumnFilter",
          filterParams: dateFilterParams,
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        menuTabs: ["filterMenuTab"],
      },
      sideBar: {
        toolPanels: ["filters"],
      },
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
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

var dateFilterParams = {
  filters: [
    {
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterDate, cellValue) {
          if (cellValue == null) return -1;
          return getDate(cellValue).getTime() - filterDate.getTime();
        },
      },
    },
    {
      filter: "agSetColumnFilter",
      filterParams: {
        comparator: function (a, b) {
          return getDate(a).getTime() - getDate(b).getTime();
        },
      },
    },
  ],
};
function getDate(value) {
  var dateParts = value.split("/");
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
}

render(<GridExample></GridExample>, document.querySelector("#root"));
