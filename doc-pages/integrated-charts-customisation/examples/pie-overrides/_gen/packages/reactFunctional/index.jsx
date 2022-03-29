"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

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
      pie: {
        series: {
          fillOpacity: 0.8,
          strokeOpacity: 0.8,
          strokeWidth: 2,
          title: {
            enabled: true,
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "Arial, sans-serif",
            color: "maroon",
          },
          highlightStyle: {
            item: {
              fill: "red",
              stroke: "yellow",
            },
          },
          shadow: {
            color: "rgba(96, 96, 175, 0.5)",
            xOffset: 0,
            yOffset: 0,
            blur: 1,
          },
          label: {
            enabled: true,
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "Arial, sans-serif",
            color: "#2222aa",
            minAngle: 30,
          },
          callout: {
            strokeWidth: 3,
            colors: ["black", "#00ff00"],
            length: 15,
          },
          tooltip: {
            renderer: function (params) {
              return {
                content:
                  "<b>" +
                  params.angleName.toUpperCase() +
                  ":</b> " +
                  params.angleValue +
                  "<br>" +
                  "<b>" +
                  params.labelName.toUpperCase() +
                  ":</b> " +
                  params.datum[params.labelKey],
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
      rowEndIndex: 4,
      columns: ["country", "gold", "silver"],
    };
    var createRangeChartParams = {
      cellRange: cellRange,
      chartType: "doughnut",
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
