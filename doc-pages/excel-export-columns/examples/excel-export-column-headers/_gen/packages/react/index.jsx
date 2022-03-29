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
        {
          headerName: "Top Level Column Group",
          children: [
            {
              headerName: "Group A",
              children: [
                { field: "athlete", minWidth: 200 },
                { field: "country", minWidth: 200 },
                { headerName: "Group", valueGetter: "data.country.charAt(0)" },
              ],
            },
            {
              headerName: "Group B",
              children: [
                { field: "sport", minWidth: 150 },
                { field: "gold" },
                { field: "silver" },
                { field: "bronze" },
                { field: "total" },
              ],
            },
          ],
        },
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      popupParent: document.body,
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) =>
      params.api.setRowData(data.filter((rec) => rec.country != null));

    fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));

    document.getElementById("columnGroups").checked = true;
  };

  onBtExport = () => {
    this.gridApi.exportDataAsExcel(getParams());
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="container">
          <div className="columns">
            <label className="option" for="columnGroups">
              <input id="columnGroups" type="checkbox" />
              Skip Column Group Headers
            </label>
            <label className="option" for="skipHeader">
              <input id="skipHeader" type="checkbox" />
              Skip Column Headers
            </label>
            <div>
              <button
                onClick={() => this.onBtExport()}
                style={{ margin: "5px 0px", fontWeight: "bold" }}
              >
                Export to Excel
              </button>
            </div>
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
                popupParent={this.state.popupParent}
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

function getBoolean(id) {
  return !!document.querySelector("#" + id).checked;
}
function getParams() {
  return {
    skipColumnGroupHeaders: getBoolean("columnGroups"),
    skipColumnHeaders: getBoolean("skipHeader"),
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
