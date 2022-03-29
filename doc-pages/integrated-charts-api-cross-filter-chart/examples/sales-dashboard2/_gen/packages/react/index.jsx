"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "salesRep", chartDataType: "category" },
        { field: "handset", chartDataType: "category" },
        {
          headerName: "Sale Price",
          field: "sale",
          maxWidth: 160,
          aggFunc: "sum",
          filter: "agNumberColumnFilter",
          chartDataType: "series",
        },
        { field: "saleDate", chartDataType: "category" },
        {
          field: "quarter",
          maxWidth: 160,
          filter: "agSetColumnFilter",
          chartDataType: "category",
        },
      ],
      defaultColDef: {
        flex: 1,
        editable: true,
        sortable: true,
        filter: "agMultiColumnFilter",
        floatingFilter: true,
        resizable: true,
      },
      rowData: getData(),
      chartThemes: ["ag-default-dark"],
      chartThemeOverrides: {
        common: {
          padding: {
            top: 20,
            right: 40,
            bottom: 20,
            left: 30,
          },
        },
        cartesian: {
          axes: {
            category: {
              label: {
                rotation: 0,
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
    createQuarterlySalesChart(params.api);
    createSalesByRefChart(params.api);
    createHandsetSalesChart(params.api);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div id="wrapper">
          <div id="top">
            <div id="lineChart" className="ag-theme-alpine-dark"></div>
            <div id="doughnutChart" className="ag-theme-alpine-dark"></div>
          </div>
          <div id="areaChart" className="ag-theme-alpine-dark"></div>
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
              chartThemeOverrides={this.state.chartThemeOverrides}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function createQuarterlySalesChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: "line",
    cellRange: {
      columns: ["quarter", "sale"],
    },
    aggFunc: "sum",
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Quarterly Sales ($)",
        },
        legend: {
          enabled: false,
        },
        axes: {
          category: {
            label: {
              rotation: 0,
            },
          },
          number: {
            label: {
              formatter: function (params) {
                return params.value / 1000 + "k";
              },
            },
          },
        },
      },
    },
    chartContainer: document.querySelector("#lineChart"),
  });
}
function createSalesByRefChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: "doughnut",
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
    chartContainer: document.querySelector("#doughnutChart"),
  });
}
function createHandsetSalesChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: "area",
    cellRange: {
      columns: ["handset", "sale"],
    },
    aggFunc: "count",
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Handsets Sold (Units)",
        },
        legend: {
          enabled: false,
        },
        padding: {
          top: 20,
          right: 60,
          bottom: 20,
          left: 50,
        },
      },
    },
    chartContainer: document.querySelector("#areaChart"),
  });
}

render(<GridExample></GridExample>, document.querySelector("#root"));
