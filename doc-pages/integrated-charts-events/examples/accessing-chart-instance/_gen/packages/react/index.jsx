"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "Month", width: 150, chartDataType: "category" },
        { field: "Sunshine (hours)", chartDataType: "series" },
        { field: "Rainfall (mm)", chartDataType: "series" },
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
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch("https://www.ag-grid.com/example-assets/weather-se-england.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onChartCreated = (event) => {
    console.log("Created chart with ID " + event.chartId);
    const chartRef = this.gridApi.getChartRef(event.chartId);
    chart = chartRef.chart;
    updateTitle(this.gridApi, chart);
  };

  onChartRangeSelectionChanged = (event) => {
    console.log("Changed range selection of chart with ID " + event.chartId);
    updateTitle(this.gridApi, chart);
  };

  onChartDestroyed = (event) => {
    console.log("Destroyed chart with ID " + event.chartId);
    chart = null;
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
            enableRangeSelection={true}
            enableCharts={true}
            onGridReady={this.onGridReady}
            onChartCreated={this.onChartCreated.bind(this)}
            onChartRangeSelectionChanged={this.onChartRangeSelectionChanged.bind(
              this
            )}
            onChartDestroyed={this.onChartDestroyed.bind(this)}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

var chart = null;
function updateTitle(api, chart) {
  var cellRange = api.getCellRanges()[1];
  if (!cellRange) return;
  var columnCount = cellRange.columns.length;
  var rowCount = cellRange.endRow.rowIndex - cellRange.startRow.rowIndex + 1;
  chart.title.enabled = true;
  chart.title.text = "Monthly Weather";
  chart.subtitle.enabled = true;
  chart.subtitle.text =
    "Using series data from " +
    columnCount +
    " column(s) and " +
    rowCount +
    " row(s)";
}

render(<GridExample></GridExample>, document.querySelector("#root"));
