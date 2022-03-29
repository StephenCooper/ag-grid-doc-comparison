"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
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

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
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
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);
  const chartThemeOverrides = useMemo(() => {
    return {
      histogram: {
        series: {
          bins: [
            [0, 10],
            [10, 40],
            [40, 80],
            [80, 100],
          ],
          fillOpacity: 0.8,
          strokeOpacity: 0.8,
          strokeWidth: 4,
          shadow: {
            enabled: true,
            color: "rgba(0, 0, 0, 0.3)",
            xOffset: 10,
            yOffset: 10,
            blur: 8,
          },
          label: {
            enabled: true,
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 15,
            fontFamily: "Arial, sans-serif",
            color: "green",
            formatter: function (params) {
              return "<" + params.value + ">";
            },
          },
          highlightStyle: {
            item: {
              fill: "black",
              stroke: "yellow",
            },
          },
          tooltip: {
            renderer: function (params) {
              var bin = params.datum;
              var binSize = bin.frequency;
              var medalColour = params.xKey;
              return {
                content:
                  binSize +
                  (binSize >= 2 ? " countries" : " country") +
                  " got between " +
                  params.xValue[0] +
                  " and " +
                  params.xValue[1] +
                  " " +
                  medalColour +
                  " medals",
              };
            },
          },
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 20,
      columns: ["bronze"],
    };
    var createRangeChartParams = {
      cellRange: cellRange,
      chartType: "histogram",
    };
    gridRef.current.api.createRangeChart(createRangeChartParams);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          popupParent={popupParent}
          enableRangeSelection={true}
          enableCharts={true}
          chartThemeOverrides={chartThemeOverrides}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
