"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";
import CountryCellRenderer from "./countryCellRenderer.jsx";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: "country",
          headerName: " ",
          minWidth: 70,
          width: 70,
          maxWidth: 70,
          cellRenderer: CountryCellRenderer,
          cellRendererParams: {
            base64flags: base64flags,
            countryCodes: countryCodes,
          },
        },
        { field: "athlete" },
        { field: "age" },
        { field: "year" },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        width: 150,
        resizable: true,
      },
      defaultExcelExportParams: {
        addImageToCell: function (rowIndex, col, value) {
          if (col.getColId() !== "country") {
            return;
          }
          const countryCode = countryCodes[value];
          return {
            image: {
              id: countryCode,
              base64: base64flags[countryCode],
              imageType: "png",
              width: 20,
              height: 11,
              position: {
                offsetX: 30,
                offsetY: 5.5,
              },
            },
          };
        },
      },
      context: {
        base64flags: base64flags,
        countryCodes: countryCodes,
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
      .then((data) =>
        createBase64FlagsFromResponse(data, countryCodes, base64flags)
      )
      .then((data) => params.api.setRowData(data));
  };

  onBtExport = () => {
    this.gridApi.exportDataAsExcel();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="container">
          <div>
            <button className="export" onClick={() => this.onBtExport()}>
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
                defaultExcelExportParams={this.state.defaultExcelExportParams}
                context={this.state.context}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const countryCodes = {};
const base64flags = {};

render(<GridExample></GridExample>, document.querySelector("#root"));
