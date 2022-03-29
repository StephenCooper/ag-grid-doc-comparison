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
      defaultCsvExportParams: {
        getCustomContentBelowRow: (params) => getCells(params),
      },
      defaultExcelExportParams: {
        getCustomContentBelowRow: (params) => getCells(params),
        columnWidth: 120,
      },
      columnDefs: [
        // group cell renderer needed for expand / collapse icons
        { field: "name", cellRenderer: "agGroupCellRenderer" },
        { field: "account" },
        { field: "calls" },
        { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
      ],
      defaultColDef: {
        flex: 1,
      },
      detailCellRendererParams: {
        detailGridOptions: {
          columnDefs: [
            { field: "callId" },
            { field: "direction" },
            { field: "number", minWidth: 150 },
            { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
            { field: "switchCode", minWidth: 150 },
          ],
          defaultColDef: {
            flex: 1,
          },
        },
        getDetailRowData: function (params) {
          params.successCallback(params.data.callRecords);
        },
      },
      excelStyles: [
        {
          id: "header",
          interior: {
            color: "#aaaaaa",
            pattern: "Solid",
          },
        },
        {
          id: "body",
          interior: {
            color: "#dddddd",
            pattern: "Solid",
          },
        },
      ],
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
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
                defaultCsvExportParams={this.state.defaultCsvExportParams}
                defaultExcelExportParams={this.state.defaultExcelExportParams}
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                masterDetail={true}
                detailCellRendererParams={this.state.detailCellRendererParams}
                excelStyles={this.state.excelStyles}
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

var getCells = (params) => {
  const cells = [
    [
      cell(""),
      cell("Call Id", "header"),
      cell("Direction", "header"),
      cell("Number", "header"),
      cell("Duration", "header"),
      cell("Switch Code", "header"),
    ],
  ].concat(
    params.node.data.callRecords.map(function (record) {
      return [
        cell(""),
        cell(record.callId, "body"),
        cell(record.direction, "body"),
        cell(record.number, "body"),
        cell(record.duration, "body"),
        cell(record.switchCode, "body"),
      ];
    }),
    [[]]
  );
  return cells;
};
function cell(text, styleId) {
  return {
    styleId: styleId,
    data: {
      type: /^\d+$/.test(text) ? "Number" : "String",
      value: String(text),
    },
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
