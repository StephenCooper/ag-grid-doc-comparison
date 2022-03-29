"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  MenuModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "firstName" },
        { field: "lastName" },
        {
          headerName: "Full Name",
          colId: "fullName",
          cellClass: "fullName",
          valueGetter: function (params) {
            return `${params.data.firstName} ${params.data.lastName}`;
          },
        },
        { field: "age" },
        { field: "company" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      defaultExcelExportParams: {
        processCellCallback: (params) => {
          const rowIndex = params.accumulatedRowIndex;
          const valueGetter = params.column.getColDef().valueGetter;
          return !!valueGetter
            ? `=CONCATENATE(A${rowIndex}, " ", B${rowIndex})`
            : params.value;
        },
      },
      excelStyles: [
        {
          id: "fullName",
          dataType: "Formula",
        },
      ],
      rowData: [
        { firstName: "Mair", lastName: "Inworth", age: 23, company: "Rhyzio" },
        { firstName: "Clair", lastName: "Cockland", age: 38, company: "Vitz" },
        { firstName: "Sonni", lastName: "Jellings", age: 24, company: "Kimia" },
        {
          firstName: "Kit",
          lastName: "Clarage",
          age: 27,
          company: "Skynoodle",
        },
        {
          firstName: "Tod",
          lastName: "de Mendoza",
          age: 29,
          company: "Teklist",
        },
        { firstName: "Herold", lastName: "Pelman", age: 23, company: "Divavu" },
        { firstName: "Paula", lastName: "Gleave", age: 37, company: "Demimbu" },
        {
          firstName: "Kendrick",
          lastName: "Clayill",
          age: 26,
          company: "Brainlounge",
        },
        {
          firstName: "Korrie",
          lastName: "Blowing",
          age: 32,
          company: "Twitternation",
        },
        {
          firstName: "Ferrell",
          lastName: "Towhey",
          age: 40,
          company: "Nlounge",
        },
        {
          firstName: "Anders",
          lastName: "Negri",
          age: 30,
          company: "Flipstorm",
        },
        {
          firstName: "Douglas",
          lastName: "Dalmon",
          age: 25,
          company: "Feedbug",
        },
        {
          firstName: "Roxanna",
          lastName: "Schukraft",
          age: 26,
          company: "Skinte",
        },
        { firstName: "Seumas", lastName: "Pouck", age: 34, company: "Aimbu" },
        {
          firstName: "Launce",
          lastName: "Welldrake",
          age: 25,
          company: "Twinte",
        },
        {
          firstName: "Siegfried",
          lastName: "Grady",
          age: 34,
          company: "Vimbo",
        },
        {
          firstName: "Vinson",
          lastName: "Hyams",
          age: 20,
          company: "Tanoodle",
        },
        {
          firstName: "Cayla",
          lastName: "Duckerin",
          age: 21,
          company: "Livepath",
        },
        { firstName: "Luigi", lastName: "Rive", age: 25, company: "Quatz" },
        { firstName: "Carolyn", lastName: "Blouet", age: 29, company: "Eamia" },
      ],
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
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                defaultExcelExportParams={this.state.defaultExcelExportParams}
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
