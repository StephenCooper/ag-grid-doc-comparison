"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  RowGroupingModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "day", maxWidth: 90 },
        { field: "month", chartDataType: "category" },
        { field: "rain", chartDataType: "series", valueParser: numberParser },
        {
          field: "pressure",
          chartDataType: "series",
          valueParser: numberParser,
        },
        { field: "temp", chartDataType: "series", valueParser: numberParser },
        { field: "wind", chartDataType: "series", valueParser: numberParser },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        editable: true,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowData: getData(),
      chartThemes: ["ag-pastel", "ag-vivid"],
      popupParent: document.body,
      chartThemeOverrides: {
        common: {
          padding: {
            right: 40,
          },
          legend: {
            position: "bottom",
          },
        },
        column: {
          series: {
            strokeWidth: 2,
            fillOpacity: 0.8,
          },
        },
        line: {
          series: {
            strokeWidth: 5,
            strokeOpacity: 0.8,
          },
        },
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    params.api.createRangeChart({
      chartType: "customCombo",
      cellRange: {
        columns: ["month", "rain", "pressure", "temp"],
      },
      seriesChartTypes: [
        { colId: "rain", chartType: "groupedColumn", secondaryAxis: false },
        { colId: "pressure", chartType: "line", secondaryAxis: true },
        { colId: "temp", chartType: "line", secondaryAxis: true },
      ],
      aggFunc: "sum",
      suppressChartRanges: true,
      chartContainer: document.querySelector("#myChart"),
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="wrapper">
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
              enableRangeSelection={true}
              chartThemes={this.state.chartThemes}
              enableCharts={true}
              popupParent={this.state.popupParent}
              chartThemeOverrides={this.state.chartThemeOverrides}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
          </div>
          <div id="myChart" className="ag-theme-alpine"></div>
        </div>
      </div>
    );
  }
}

function numberParser(params) {
  const value = params.newValue;
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return parseFloat(value);
}

render(<GridExample></GridExample>, document.querySelector("#root"));
