"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

const numberParser = (params) => {
  const value = params.newValue;
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return parseFloat(value);
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: "day", maxWidth: 90 },
    { field: "month", chartDataType: "category" },
    { field: "rain", chartDataType: "series", valueParser: numberParser },
    { field: "pressure", chartDataType: "series", valueParser: numberParser },
    { field: "temp", chartDataType: "series", valueParser: numberParser },
    { field: "wind", chartDataType: "series", valueParser: numberParser },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);
  const chartThemes = useMemo(() => {
    return ["ag-pastel", "ag-vivid"];
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);
  const chartThemeOverrides = useMemo(() => {
    return {
      common: {
        padding: {
          right: 40,
        },
        legend: {
          position: "bottom",
        },
      },
      column: {
        series: {
          strokeWidth: 2,
          fillOpacity: 0.8,
        },
      },
      line: {
        series: {
          strokeWidth: 5,
          strokeOpacity: 0.8,
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.createRangeChart({
      chartType: "customCombo",
      cellRange: {
        columns: ["month", "rain", "pressure", "temp"],
      },
      seriesChartTypes: [
        { colId: "rain", chartType: "groupedColumn", secondaryAxis: false },
        { colId: "pressure", chartType: "line", secondaryAxis: true },
        { colId: "temp", chartType: "line", secondaryAxis: true },
      ],
      aggFunc: "sum",
      suppressChartRanges: true,
      chartContainer: document.querySelector("#myChart"),
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="wrapper">
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection={true}
            chartThemes={chartThemes}
            enableCharts={true}
            popupParent={popupParent}
            chartThemeOverrides={chartThemeOverrides}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
        <div id="myChart" className="ag-theme-alpine"></div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
