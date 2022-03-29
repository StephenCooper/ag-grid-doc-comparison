"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
  RowGroupingModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "country", minWidth: 120, rowGroup: true },
        { field: "year", rowGroup: true },
        { headerName: "Name", field: "athlete", minWidth: 150 },
        {
          headerName: "Name Length",
          valueGetter: 'data ? data.athlete.length : ""',
        },
        { field: "sport", minWidth: 120, rowGroup: true },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      autoGroupColumnDef: {
        cellClass: getIndentClass,
        minWidth: 250,
        flex: 1,
      },
      excelStyles: [
        {
          id: "indent-1",
          alignment: {
            indent: 1,
          },
          // note, dataType: 'string' required to ensure that numeric values aren't right-aligned
          dataType: "String",
        },
        {
          id: "indent-2",
          alignment: {
            indent: 2,
          },
          dataType: "String",
        },
        {
          id: "indent-3",
          alignment: {
            indent: 3,
          },
          dataType: "String",
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
      params.api.forEachNode(function (node) {
        node.expanded = true;
      });
      params.api.onGroupExpandedOrCollapsed();
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onBtnExportDataAsExcel = () => {
    this.gridApi.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
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
                autoGroupColumnDef={this.state.autoGroupColumnDef}
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

function rowGroupCallback(params) {
  return params.node.key;
}
function getIndentClass(params) {
  var indent = 0;
  var node = params.node;
  while (node && node.parent) {
    indent++;
    node = node.parent;
  }
  return "indent-" + indent;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
