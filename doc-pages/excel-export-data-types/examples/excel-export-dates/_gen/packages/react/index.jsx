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
        {
          field: "date",
          headerName: "ISO Format",
          cellClass: "dateISO",
          minWidth: 150,
        },
        {
          field: "date",
          headerName: "dd/mm/yy",
          cellClass: "dateUK",
          valueFormatter: function (params) {
            var date = new Date(params.value);
            var day = date.getDate().toString().padStart(2, "0");
            var month = (date.getMonth() + 1).toString().padStart(2, "0");
            var year = date.getFullYear().toString().substring(2);
            return day + "/" + month + "/" + year;
          },
        },
        {
          field: "date",
          headerName: "mm/dd/yy",
          cellClass: "dateUS",
          valueFormatter: function (params) {
            var date = new Date(params.value);
            var day = date.getDate().toString().padStart(2, "0");
            var month = (date.getMonth() + 1).toString().padStart(2, "0");
            var year = date.getFullYear().toString().substring(2);
            return month + "/" + day + "/" + year;
          },
        },
        {
          field: "date",
          headerName: "dd/mm/yyy h:mm:ss AM/PM",
          cellClass: "dateLong",
          minWidth: 150,
          valueFormatter: function (params) {
            var date = new Date(params.value);
            var day = date.getDate().toString().padStart(2, "0");
            var month = (date.getMonth() + 1).toString().padStart(2, "0");
            var year = date.getFullYear().toString();
            var hourNum = date.getHours() % 12;
            var hour = (hourNum === 0 ? 12 : hourNum)
              .toString()
              .padStart(2, "0");
            var min = date.getMinutes().toString().padStart(2, "0");
            var sec = date.getSeconds().toString().padStart(2, "0");
            var amPM = date.getHours() < 12 ? "AM" : "PM";
            return (
              day +
              "/" +
              month +
              "/" +
              year +
              " " +
              hour +
              ":" +
              min +
              ":" +
              sec +
              " " +
              amPM
            );
          },
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      excelStyles: [
        {
          id: "dateISO",
          dataType: "DateTime",
          numberFormat: {
            format: "yyy-mm-ddThh:mm:ss",
          },
        },
        {
          id: "dateUK",
          dataType: "DateTime",
          numberFormat: {
            format: "dd/mm/yy",
          },
        },
        {
          id: "dateUS",
          dataType: "DateTime",
          numberFormat: {
            format: "mm/dd/yy",
          },
        },
        {
          id: "dateLong",
          dataType: "DateTime",
          numberFormat: {
            format: "dd/mm/yyy h:mm:ss AM/PM",
          },
        },
      ],
      rowData: [
        { date: "2020-05-30T10:01:00" },
        { date: "2015-04-21T16:30:00" },
        { date: "2010-02-19T12:02:00" },
        { date: "1995-10-04T03:27:00" },
      ],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onBtnExportDataAsExcel = () => {
    this.gridApi.exportDataAsExcel();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="page-wrapper">
          <div>
            <button
              onClick={() => this.onBtnExportDataAsExcel()}
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
                excelStyles={this.state.excelStyles}
                rowData={this.state.rowData}
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
