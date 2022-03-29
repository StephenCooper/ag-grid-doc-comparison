"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import DetailCellRenderer from "./detailCellRenderer.jsx";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailCellRenderer: DetailCellRenderer,
      detailRowHeight: 150,
      columnDefs: [
        // group cell renderer needed for expand / collapse icons
        { field: "name", cellRenderer: "agGroupCellRenderer", pinned: "left" },
        { field: "account" },
        { field: "calls" },
        { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
        { headerName: "Extra Col 1", valueGetter: '"AAA"' },
        { headerName: "Extra Col 2", valueGetter: '"BBB"' },
        { headerName: "Extra Col 3", valueGetter: '"CCC"' },
        { headerName: "Pinned Right", pinned: "right" },
      ],
      defaultColDef: {},
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = (params) => {
    setTimeout(function () {
      params.api.forEachNode(function (node) {
        node.setExpanded(node.id === "1");
      });
    }, 1000);
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
            masterDetail={true}
            detailCellRenderer={this.state.detailCellRenderer}
            detailRowHeight={this.state.detailRowHeight}
            animateRows={true}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            embedFullWidthRows={true}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
