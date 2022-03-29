"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowData: [
        { orgHierarchy: ["A"] },
        { orgHierarchy: ["A", "B"] },
        { orgHierarchy: ["C", "D"] },
        { orgHierarchy: ["E", "F", "G", "H"] },
      ],
      columnDefs: [
        // we're using the auto group column by default!
        {
          field: "groupType",
          valueGetter: function (params) {
            return params.data ? "Provided" : "Filler";
          },
        },
      ],
      defaultColDef: {
        flex: 1,
      },
      autoGroupColumnDef: {
        headerName: "Organisation Hierarchy",
        cellRendererParams: {
          suppressCount: true,
        },
      },
      groupDefaultExpanded: -1,
      getDataPath: function (data) {
        return data.orgHierarchy;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
            rowData={this.state.rowData}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            treeData={true}
            animateRows={true}
            groupDefaultExpanded={this.state.groupDefaultExpanded}
            getDataPath={this.state.getDataPath}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
