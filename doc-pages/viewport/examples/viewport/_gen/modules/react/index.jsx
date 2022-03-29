"use strict";

import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ViewportRowModelModule } from "@ag-grid-enterprise/viewport-row-model";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ViewportRowModelModule]);

class RowIndexRenderer {
  init(params) {
    this.eGui = document.createElement("div");
    this.eGui.innerHTML = "" + params.rowIndex;
  }
  refresh(params) {
    return false;
  }
  getGui() {
    return this.eGui;
  }
}

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // this col shows the row index, doesn't use any data from the row
        {
          headerName: "#",
          maxWidth: 80,
          cellRenderer: RowIndexRenderer,
        },
        { field: "code", maxWidth: 90 },
        { field: "name", minWidth: 220 },
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
        minWidth: 140,
        resizable: true,
      },
      rowSelection: "multiple",
      rowModelType: "viewport",
      getRowId: function (params) {
        // the code is unique, so perfect for the id
        return params.data.code;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      // set up a mock server - real code will not do this, it will contact your
      // real server to get what it needs
      var mockServer = createMockServer();
      mockServer.init(data);
      var viewportDatasource = createViewportDatasource(mockServer);
      params.api.setViewportDatasource(viewportDatasource);
      // put the 'size cols to fit' into a timeout, so that the scroll is taken into consideration
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      }, 100);
    };

    fetch("https://www.ag-grid.com/example-assets/stocks.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
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
            rowSelection={this.state.rowSelection}
            rowModelType={this.state.rowModelType}
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
  } else {
    return params.value;
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
