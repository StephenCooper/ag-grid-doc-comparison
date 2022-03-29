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
      columnDefs: getColumnDefs(),
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
      popupParent: document.body,
      rowData: getRowData(),
      chartThemeOverrides: {
        line: {
          title: {
            enabled: true,
            text: "Average Daily Temperatures",
          },
          legend: {
            enabled: false,
          },
          padding: {
            top: 15,
            bottom: 25,
          },
          navigator: {
            enabled: true,
            height: 20,
            margin: 25,
          },
          axes: {
            time: {
              label: {
                rotation: 0,
                format: "%d %b",
              },
            },
            category: {
              label: {
                rotation: 0,
                formatter: function (params) {
                  return moment(new Date(params.value)).format("DD MMM");
                },
              },
            },
            number: {
              label: {
                formatter: function (params) {
                  return params.value + "°C";
                },
              },
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
    if (currentChartRef) {
      currentChartRef.destroyChart();
    }
    var createRangeChartParams = {
      chartContainer: document.querySelector("#myChart"),
      suppressChartRanges: true,
      cellRange: {
        columns: ["date", "avgTemp"],
      },
      chartType: "line",
    };
    currentChartRef = params.api.createRangeChart(createRangeChartParams);
  };

  toggleAxis = () => {
    var axisBtn = document.querySelector("#axisBtn");
    axisBtn.textContent = axisBtn.value;
    axisBtn.value = axisBtn.value === "time" ? "category" : "time";
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      if (colDef.field === "date") {
        colDef.chartDataType = axisBtn.value;
      }
    });
    this.gridApi.setColumnDefs(columnDefs);
  };

  getChartToolbarItems = () => {
    return ["chartData", "chartFormat"];
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <label>Switch Axis to: </label>
        <button id="axisBtn" onClick={() => this.toggleAxis()} value="time">
          Category
        </button>
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
              popupParent={this.state.popupParent}
              rowData={this.state.rowData}
              enableRangeSelection={true}
              enableCharts={true}
              chartThemeOverrides={this.state.chartThemeOverrides}
              getChartToolbarItems={this.getChartToolbarItems}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
          </div>
          <div id="myChart" className="ag-theme-alpine my-chart"></div>
        </div>
      </div>
    );
  }
}

function getColumnDefs() {
  return [
    { field: "date", valueFormatter: dateFormatter },
    { field: "avgTemp" },
  ];
}
var currentChartRef;
function dateFormatter(params) {
  return params.value
    ? params.value.toISOString().substring(0, 10)
    : params.value;
}
function getRowData() {
  return [
    { date: new Date(2019, 0, 1), avgTemp: 8.27 },
    { date: new Date(2019, 0, 5), avgTemp: 7.22 },
    { date: new Date(2019, 0, 8), avgTemp: 11.54 },
    { date: new Date(2019, 0, 11), avgTemp: 8.44 },
    { date: new Date(2019, 0, 22), avgTemp: 12.03 },
    { date: new Date(2019, 0, 23), avgTemp: 9.68 },
    { date: new Date(2019, 0, 24), avgTemp: 9.9 },
    { date: new Date(2019, 0, 25), avgTemp: 8.74 },
  ];
}

render(<GridExample></GridExample>, document.querySelector("#root"));
