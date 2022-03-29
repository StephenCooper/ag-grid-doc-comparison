"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class NodeIdRenderer {
  init(params) {
    this.eGui = document.createElement("div");
    this.eGui.innerHTML = params.node.id + 1;
  }

  getGui() {
    return this.eGui;
  }
  refresh() {
    return false;
  }
}

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // this row just shows the row index, doesn't use any data from the row
        {
          headerName: "#",
          cellRenderer: NodeIdRenderer,
        },
        {
          field: "athlete",
          filterParams: { buttons: ["clear", "reset", "apply"] },
        },
        {
          field: "age",
          filterParams: { buttons: ["apply", "cancel"] },
          enablePivot: true,
        },
        { field: "country", enableRowGroup: true },
        { field: "year", filter: "agNumberColumnFilter" },
        { field: "date" },
        {
          field: "sport",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter",
                display: "accordion",
              },
              {
                filter: "agSetColumnFilter",
                display: "accordion",
              },
            ],
          },
        },
        { field: "gold", enableValue: true },
        { field: "silver", enableValue: true },
        { field: "bronze", enableValue: true },
        { field: "total", enableValue: true },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      statusBar: {
        statusPanels: [
          { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
          { statusPanel: "agAggregationComponent" },
        ],
      },
      rowGroupPanelShow: "always",
      paginationPageSize: 500,
      getLocaleText: function (params) {
        switch (params.key) {
          case "thousandSeparator":
            return ".";
          case "decimalSeparator":
            return ",";
          default:
            return params.defaultValue ? params.defaultValue.toUpperCase() : "";
        }
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
            sideBar={true}
            statusBar={this.state.statusBar}
            rowGroupPanelShow={this.state.rowGroupPanelShow}
            pagination={true}
            paginationPageSize={this.state.paginationPageSize}
            enableRangeSelection={true}
            enableCharts={true}
            getLocaleText={this.state.getLocaleText}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
