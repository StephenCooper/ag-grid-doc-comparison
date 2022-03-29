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
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      popupParent: document.body,
      rowData: getData(),
      chartThemeOverrides: {
        common: {
          padding: {
            top: 20,
            right: 30,
            bottom: 10,
            left: 2,
          },
          background: {
            fill: "#e5e5e5",
          },
          title: {
            enabled: true,
            text: "Precious Metals Production",
            fontStyle: "italic",
            fontWeight: "600",
            fontSize: 18,
            fontFamily: "Impact, sans-serif",
            color: "#414182",
          },
          subtitle: {
            enabled: true,
            text: "by country",
            fontSize: 14,
            fontFamily: "Monaco, monospace",
            color: "rgb(100, 100, 100)",
          },
          legend: {
            enabled: true,
            position: "left",
            spacing: 20,
            item: {
              label: {
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: 18,
                fontFamily: "Palatino, serif",
                color: "#555",
              },
              marker: {
                shape: "diamond",
                size: 10,
                padding: 10,
                strokeWidth: 2,
              },
              paddingX: 120,
              paddingY: 20,
            },
          },
          tooltip: {
            class: "my-tooltip-class",
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
