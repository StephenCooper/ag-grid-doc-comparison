"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "country", rowGroup: true, hide: true },
        { field: "year", rowGroup: true, hide: true },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { headerName: "Gold*pi", field: "goldPi", minWidth: 200 },
        { headerName: "Silver*pi", field: "silverPi", minWidth: 200 },
        { headerName: "Bronze*pi", field: "bronzePi", minWidth: 200 },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
      },
      autoGroupColumnDef: {
        headerName: "Athlete",
        field: "athlete",
        minWidth: 250,
      },
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

  expandAll = () => {
    this.gridApi.expandAll();
  };

  collapseAll = () => {
    this.gridApi.collapseAll();
  };

  getGroupRowAgg = (params) => {
    const result = {
      gold: 0,
      silver: 0,
      bronze: 0,
      goldPi: 0,
      silverPi: 0,
      bronzePi: 0,
    };
    params.nodes.forEach((node) => {
      const data = node.group ? node.aggData : node.data;
      if (typeof data.gold === "number") {
        result.gold += data.gold;
        result.goldPi += data.gold * Math.PI;
      }
      if (typeof data.silver === "number") {
        result.silver += data.silver;
        result.silverPi += data.silver * Math.PI;
      }
      if (typeof data.bronze === "number") {
        result.bronze += data.bronze;
        result.bronzePi += data.bronze * Math.PI;
      }
    });
    return result;
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.expandAll()}>Expand All</button>
            <button onClick={() => this.collapseAll()}>Collapse All</button>
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
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              sideBar={true}
              enableRangeSelection={true}
              getGroupRowAgg={this.getGroupRowAgg}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
