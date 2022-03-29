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
      rowData: getData(),
      popupParent: document.body,
      chartThemeOverrides: {
        pie: {
          title: {
            enabled: true,
            text: "Precious Metals Production",
            fontWeight: "bold",
            fontSize: 20,
            color: "rgb(100, 100, 100)",
          },
          subtitle: {
            enabled: true,
            text: "by country",
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 14,
            color: "rgb(100, 100, 100)",
          },
          padding: {
            top: 25,
            right: 20,
            bottom: 55,
            left: 20,
          },
          legend: {
            enabled: false,
          },
          series: {
            label: {
              enabled: true,
            },
            callout: {
              length: 20,
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
    var createRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 5,
        columns: ["country", "gold"],
      },
      chartType: "pie",
    };
    params.api.createRangeChart(createRangeChartParams);
  };

  getChartToolbarItems = () => {
    return ["chartDownload", "chartData", "chartSettings"];
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
            rowData={this.state.rowData}
            popupParent={this.state.popupParent}
            enableRangeSelection={true}
            enableCharts={true}
            chartThemeOverrides={this.state.chartThemeOverrides}
            getChartToolbarItems={this.getChartToolbarItems}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
