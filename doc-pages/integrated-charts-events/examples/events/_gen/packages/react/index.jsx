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
    console.log("Created chart with ID " + event.chartId, event);
  };

  onChartRangeSelectionChanged = (event) => {
    console.log(
      "Changed range selection of chart with ID " + event.chartId,
      event
    );
  };

  onChartOptionsChanged = (event) => {
    console.log("Changed options of chart with ID " + event.chartId, event);
  };

  onChartDestroyed = (event) => {
    console.log("Destroyed chart with ID " + event.chartId, event);
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
            onChartOptionsChanged={this.onChartOptionsChanged.bind(this)}
            onChartDestroyed={this.onChartDestroyed.bind(this)}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
