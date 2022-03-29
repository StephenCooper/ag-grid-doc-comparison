"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: "salesRep", chartDataType: "category" },
    { field: "handset", chartDataType: "category" },
    { field: "sale", chartDataType: "series" },
    { field: "saleDate", chartDataType: "category" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      filter: "agSetColumnFilter",
      floatingFilter: true,
      resizable: true,
    };
  }, []);
  const chartThemes = useMemo(() => {
    return ["ag-default-dark"];
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.createCrossFilterChart({
      chartType: "pie",
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
      chartContainer: document.querySelector("#pieChart"),
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div id="wrapper">
        <div id="pieChart" className="ag-theme-alpine-dark"></div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
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
