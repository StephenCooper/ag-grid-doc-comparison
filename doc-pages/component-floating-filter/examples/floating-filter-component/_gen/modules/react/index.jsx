"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { Component } from "react";
import { render } from "react-dom";
import SliderFloatingFilter from "./sliderFloatingFilter.jsx";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "country", filter: false },
        { field: "language", filter: false },
        { field: "name", filter: false },
        {
          field: "gold",
          floatingFilterComponent: SliderFloatingFilter,
          floatingFilterComponentParams: {
            maxValue: 7,
            suppressFilterButton: true,
          },
          filter: "agNumberColumnFilter",
          suppressMenu: false,
        },
        {
          field: "silver",
          filter: "agNumberColumnFilter",
          floatingFilterComponent: SliderFloatingFilter,
          floatingFilterComponentParams: {
            maxValue: 5,
            suppressFilterButton: true,
          },
          suppressMenu: false,
        },
        {
          field: "bronze",
          filter: "agNumberColumnFilter",
          floatingFilterComponent: SliderFloatingFilter,
          floatingFilterComponentParams: {
            maxValue: 10,
            suppressFilterButton: true,
          },
          suppressMenu: false,
        },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        floatingFilter: true,
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

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ height: "100%", boxSizing: "border-box" }}>
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
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
