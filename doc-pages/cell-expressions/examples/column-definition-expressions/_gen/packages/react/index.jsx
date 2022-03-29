"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "String (editable)",
          field: "simple",
          editable: true,
        },
        {
          headerName: "Bad Number (editable)",
          field: "numberBad",
          editable: true,
        },
        {
          headerName: "Good Number (editable)",
          field: "numberGood",
          editable: true,
          valueFormatter: `"£" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")`,
          valueParser: "Number(newValue)",
        },
        {
          headerName: "Name (editable)",
          editable: true,
          valueGetter: 'data.firstName + " " + data.lastName',
          valueSetter:
            // an expression can span multiple lines!!!
            `var nameSplit = newValue.split(" ");
             var newFirstName = nameSplit[0];
             var newLastName = nameSplit[1];
             if (data.firstName !== newFirstName || data.lastName !== newLastName) {  
                data.firstName = newFirstName;  
                data.lastName = newLastName;  
                return true;
            } else {  
                return false;
            }`,
        },
        { headerName: "A", field: "a", maxWidth: 120 },
        { headerName: "B", field: "b", maxWidth: 120 },
        { headerName: "A + B", valueGetter: "data.a + data.b", maxWidth: 120 },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
      },
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };

  onCellValueChanged = (event) => {
    console.log("data after changes is: ", event.data);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
          className="ag-theme-alpine-dark"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            enableRangeSelection={true}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
            onCellValueChanged={this.onCellValueChanged.bind(this)}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
