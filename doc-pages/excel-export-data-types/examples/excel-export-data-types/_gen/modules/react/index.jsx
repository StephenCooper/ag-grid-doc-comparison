"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  ExcelExportModule,
  MenuModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: "provided", field: "rawValue" },
        { headerName: "number", field: "rawValue", cellClass: "numberType" },
        {
          headerName: "currency",
          field: "rawValue",
          cellClass: "currencyFormat",
        },
        { headerName: "boolean", field: "rawValue", cellClass: "booleanType" },
        {
          headerName: "Negative",
          field: "negativeValue",
          cellClass: "negativeInBrackets",
        },
        { headerName: "string", field: "rawValue", cellClass: "stringType" },
        {
          headerName: "Date",
          field: "dateValue",
          cellClass: "dateType",
          minWidth: 220,
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowData: [
        {
          rawValue: 1,
          negativeValue: -10,
          dateValue: "2009-04-20T00:00:00.000",
        },
      ],
      excelStyles: [
        {
          id: "numberType",
          numberFormat: {
            format: "0",
          },
        },
        {
          id: "currencyFormat",
          numberFormat: {
            format: "#,##0.00 €",
          },
        },
        {
          id: "negativeInBrackets",
          numberFormat: {
            format: "$[blue] #,##0;$ [red](#,##0)",
          },
        },
        {
          id: "booleanType",
          dataType: "Boolean",
        },
        {
          id: "stringType",
          dataType: "String",
        },
        {
          id: "dateType",
          dataType: "DateTime",
        },
      ],
      popupParent: document.body,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onBtExport = () => {
    this.gridApi.exportDataAsExcel();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div className="example-header">
            <button
              onClick={() => this.onBtExport()}
              style={{ fontWeight: "bold" }}
            >
              Export to Excel
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
              excelStyles={this.state.excelStyles}
              popupParent={this.state.popupParent}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
