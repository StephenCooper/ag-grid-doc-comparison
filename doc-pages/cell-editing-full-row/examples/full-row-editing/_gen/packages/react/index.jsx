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
          field: "make",
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: ["Porsche", "Toyota", "Ford", "AAA", "BBB", "CCC"],
          },
        },
        { field: "model" },
        { field: "field4", headerName: "Read Only", editable: false },
        { field: "price", cellEditor: NumericCellEditor },
        {
          headerName: "Suppress Navigable",
          field: "field5",
          suppressNavigable: true,
          minWidth: 200,
        },
        { headerName: "Read Only", field: "field6", editable: false },
      ],
      defaultColDef: {
        flex: 1,
        editable: true,
      },
      editType: "fullRow",
      rowData: getRowData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onCellValueChanged = (event) => {
    console.log(
      "onCellValueChanged: " + event.colDef.field + " = " + event.newValue
    );
  };

  onRowValueChanged = (event) => {
    var data = event.data;
    console.log(
      "onRowValueChanged: (" +
        data.make +
        ", " +
        data.model +
        ", " +
        data.price +
        ", " +
        data.field5 +
        ")"
    );
  };

  onBtStopEditing = () => {
    this.gridApi.stopEditing();
  };

  onBtStartEditing = () => {
    this.gridApi.setFocusedCell(2, "make");
    this.gridApi.startEditingCell({
      rowIndex: 2,
      colKey: "make",
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button
              style={{ fontSize: "12px" }}
              onClick={() => this.onBtStartEditing()}
            >
              Start Editing Line 2
            </button>
            <button
              style={{ fontSize: "12px" }}
              onClick={() => this.onBtStopEditing()}
            >
              Stop Editing
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
              editType={this.state.editType}
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
              onCellValueChanged={this.onCellValueChanged.bind(this)}
              onRowValueChanged={this.onRowValueChanged.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getRowData() {
  var rowData = [];
  for (var i = 0; i < 10; i++) {
    rowData.push({
      make: "Toyota",
      model: "Celica",
      price: 35000 + i * 1000,
      field4: "Sample XX",
      field5: "Sample 22",
      field6: "Sample 23",
    });
    rowData.push({
      make: "Ford",
      model: "Mondeo",
      price: 32000 + i * 1000,
      field4: "Sample YY",
      field5: "Sample 24",
      field6: "Sample 25",
    });
    rowData.push({
      make: "Porsche",
      model: "Boxter",
      price: 72000 + i * 1000,
      field4: "Sample ZZ",
      field5: "Sample 26",
      field6: "Sample 27",
    });
  }
  return rowData;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
