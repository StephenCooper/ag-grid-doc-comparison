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
          headerName: "Participants",
          children: [
            { field: "athlete", headerName: "Athlete Name", minWidth: 200 },
            { field: "age" },
            { field: "country", minWidth: 150 },
          ],
        },
        {
          headerName: "Olympic Games",
          children: [
            { field: "year" },
            { field: "date", minWidth: 150 },
            { field: "sport", minWidth: 150 },
            { field: "gold" },
            { field: "silver", suppressPaste: true },
            { field: "bronze" },
            { field: "total" },
          ],
        },
      ],
      defaultColDef: {
        editable: true,
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowSelection: "multiple",
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

  processCellForClipboard = (params) => {
    return "C-" + params.value;
  };

  processHeaderForClipboard = (params) => {
    const colDef = params.column.getColDef();
    let headerName = colDef.headerName || colDef.field || "";
    if (colDef.headerName !== "") {
      headerName = headerName.charAt(0).toUpperCase() + headerName.slice(1);
    }
    return "H-" + headerName;
  };

  processGroupHeaderForClipboard = (params) => {
    const colGroupDef = params.columnGroup.getColGroupDef() || {};
    const headerName = colGroupDef.headerName || "";
    if (headerName === "") {
      return "";
    }
    return "GH-" + headerName;
  };

  processCellFromClipboard = (params) => {
    return "Z-" + params.value;
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
            enableRangeSelection={true}
            rowSelection={this.state.rowSelection}
            processCellForClipboard={this.processCellForClipboard}
            processHeaderForClipboard={this.processHeaderForClipboard}
            processGroupHeaderForClipboard={this.processGroupHeaderForClipboard}
            processCellFromClipboard={this.processCellFromClipboard}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
