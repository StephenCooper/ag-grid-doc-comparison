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
        { field: "code", maxWidth: 90 },
        { field: "name", minWidth: 200 },
        {
          field: "bid",
          cellClass: "cell-number",
          valueFormatter: numberFormatter,
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: "mid",
          cellClass: "cell-number",
          valueFormatter: numberFormatter,
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: "ask",
          cellClass: "cell-number",
          valueFormatter: numberFormatter,
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: "volume",
          cellClass: "cell-number",
          cellRenderer: "agAnimateSlideCellRenderer",
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      getRowId: function (params) {
        return params.data.code;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const mockServer = createMockServer(),
      initialLoad$ = mockServer.initialLoad(),
      updates$ = mockServer.allDataUpdates();
    initialLoad$.subscribe(function (rowData) {
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      params.api.setRowData(rowData);
      // now listen for updates
      // we're using immutableData this time, so although we're setting the entire
      // data set here, the grid will only re-render changed rows, improving performance
      updates$.subscribe(function (newRowData) {
        return params.api.setRowData(newRowData);
      });
    });
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
            getRowId={this.state.getRowId}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function numberFormatter(params) {
  if (typeof params.value === "number") {
    return params.value.toFixed(2);
  }
  return params.value;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
