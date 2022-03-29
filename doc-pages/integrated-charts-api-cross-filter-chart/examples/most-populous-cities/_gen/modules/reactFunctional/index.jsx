"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  SetFilterModule,
  MultiFilterModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
]);

const createColumnChart = (gridApi) => {
  gridApi.createCrossFilterChart({
    chartType: "column",
    cellRange: {
      columns: ["country", "population"],
    },
    aggFunc: "count",
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Number of Most Populous Cities by Country",
        },
        legend: {
          enabled: false,
        },
      },
      cartesian: {
        axes: {
          category: {
            label: {
              rotation: 325,
            },
          },
        },
      },
    },
    chartContainer: document.querySelector("#barChart"),
  });
};

const createBubbleChart = (gridApi) => {
  gridApi.createCrossFilterChart({
    chartType: "bubble",
    cellRange: {
      columns: ["longitude", "latitude", "population"],
    },
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Latitude vs Longitude of Most Populous Cities",
        },
        legend: {
          enabled: false,
        },
      },
    },
    chartContainer: document.querySelector("#bubbleChart"),
  });
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: "city", chartDataType: "category" },
    { field: "country", chartDataType: "category" },
    { field: "longitude", chartDataType: "series" },
    { field: "latitude", chartDataType: "series" },
    { field: "population", chartDataType: "series" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      sortable: true,
      filter: "agMultiColumnFilter",
      floatingFilter: true,
      resizable: true,
    };
  }, []);
  const chartThemes = useMemo(() => {
    return ["ag-default-dark"];
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    createColumnChart(params.api);
    createBubbleChart(params.api);
  }, []);

  return (
    <div style={containerStyle}>
      <div id="wrapper">
        <div id="barChart" className="ag-theme-alpine-dark"></div>
        <div id="bubbleChart" className="ag-theme-alpine-dark"></div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableCharts={true}
            chartThemes={chartThemes}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
