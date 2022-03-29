"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

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
        line: {
          series: {
            strokeOpacity: 0.7,
            strokeWidth: 5,
            highlightStyle: {
              item: {
                fill: "red",
                stroke: "yellow",
              },
            },
            marker: {
              enabled: true,
              shape: "diamond",
              size: 12,
              strokeWidth: 4,
              fillOpacity: 0.2,
              strokeOpacity: 0.2,
            },
            tooltip: {
              renderer: function (params) {
                return {
                  content:
                    "<b>" +
                    params.xName.toUpperCase() +
                    ":</b> " +
                    params.xValue +
                    "<br/>" +
                    "<b>" +
                    params.yName.toUpperCase() +
                    ":</b> " +
                    params.yValue,
                };
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
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ["country", "gold", "silver", "bronze"],
    };
    var createRangeChartParams = {
      cellRange: cellRange,
      chartType: "line",
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
