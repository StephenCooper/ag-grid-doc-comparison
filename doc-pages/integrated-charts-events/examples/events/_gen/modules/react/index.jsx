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
