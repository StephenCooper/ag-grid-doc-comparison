"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgGridReact } from "@ag-grid-community/react";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  SetFilterModule,
  MultiFilterModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "salesRep", chartDataType: "category" },
        { field: "handset", chartDataType: "category" },
        { field: "sale", chartDataType: "series" },
        { field: "saleDate", chartDataType: "category" },
      ],
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: "agSetColumnFilter",
        floatingFilter: true,
        resizable: true,
      },
      rowData: getData(),
      chartThemes: ["ag-default-dark"],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    params.api.createCrossFilterChart({
      chartType: "pie",
      cellRange: {
        columns: ["salesRep", "sale"],
      },
      aggFunc: "sum",
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: "Sales by Representative ($)",
          },
        },
        pie: {
          series: {
            title: {
              enabled: false,
            },
            label: {
              enabled: false,
            },
          },
        },
      },
      chartContainer: document.querySelector("#pieChart"),
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div id="wrapper">
          <div id="pieChart" className="ag-theme-alpine-dark"></div>
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
              rowData={this.state.rowData}
              enableCharts={true}
              chartThemes={this.state.chartThemes}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
