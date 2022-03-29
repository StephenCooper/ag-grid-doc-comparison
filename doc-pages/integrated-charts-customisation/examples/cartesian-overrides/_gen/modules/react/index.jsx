"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { MenuModule } from "@ag-grid-enterprise/menu";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "country", width: 150, chartDataType: "category" },
        { field: "gold", chartDataType: "series" },
        { field: "silver", chartDataType: "series" },
        { field: "bronze", chartDataType: "series" },
        {
          headerName: "A",
          valueGetter: "Math.floor(Math.random()*1000)",
          chartDataType: "series",
        },
        {
          headerName: "B",
          valueGetter: "Math.floor(Math.random()*1000)",
          chartDataType: "series",
        },
        {
          headerName: "C",
          valueGetter: "Math.floor(Math.random()*1000)",
          chartDataType: "series",
        },
        {
          headerName: "D",
          valueGetter: "Math.floor(Math.random()*1000)",
          chartDataType: "series",
        },
      ],
      defaultColDef: {
        width: 100,
        resizable: true,
      },
      popupParent: document.body,
      rowData: getData(),
      chartThemeOverrides: {
        cartesian: {
          axes: {
            number: {
              line: {
                width: 6,
                color: "black",
              },
              tick: {
                width: 2,
                size: 10,
                color: "gray",
              },
              label: {
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: 15,
                fontFamily: "Arial, sans-serif",
                color: "#de7b73",
                padding: 10,
                rotation: 20,
                formatter: function (params) {
                  return params.value.toString().toUpperCase();
                },
              },
              gridStyle: [
                {
                  stroke: "rgba(94,100,178,0.5)",
                },
              ],
              title: {
                enabled: true,
                text: "Tonnes",
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: 16,
                fontFamily: "Arial, sans-serif",
                color: "blue",
              },
            },
            category: {
              line: {
                width: 2,
                color: "blue",
              },
              tick: {
                width: 2,
                size: 10,
                color: "blue",
              },
              label: {
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: 15,
                fontFamily: "Arial, sans-serif",
                color: "#de7b73",
                padding: 10,
                rotation: -20,
                formatter: function (params) {
                  var value = String(params.value);
                  return value === "United Kingdom" ? "UK" : "(" + value + ")";
                },
              },
              gridStyle: [
                {
                  stroke: "#80808044",
                  lineDash: undefined,
                },
                {
                  stroke: "#80808044",
                  lineDash: [6, 3],
                },
              ],
              title: {
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: 16,
                fontFamily: "Arial, sans-serif",
                color: "blue",
              },
            },
          },
          navigator: {
            enabled: true,
            height: 9,
            min: 0.2,
            max: 1,
            mask: {
              fill: "lime",
              stroke: "black",
              strokeWidth: 2,
              fillOpacity: 0.3,
            },
            minHandle: {
              fill: "yellow",
              stroke: "blue",
              strokeWidth: 2,
              width: 12,
              height: 22,
              gripLineGap: 4,
              gripLineLength: 12,
            },
            maxHandle: {
              fill: "yellow",
              stroke: "blue",
              strokeWidth: 2,
              width: 12,
              height: 22,
              gripLineGap: 4,
              gripLineLength: 12,
            },
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
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ["country", "gold", "silver", "bronze"],
    };
    var createRangeChartParams = {
      cellRange: cellRange,
      chartType: "groupedBar",
    };
    params.api.createRangeChart(createRangeChartParams);
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
            popupParent={this.state.popupParent}
            rowData={this.state.rowData}
            enableRangeSelection={true}
            enableCharts={true}
            chartThemeOverrides={this.state.chartThemeOverrides}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
