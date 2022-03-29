"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const renderer = (params) => {
  return {
    backgroundColor: "black",
    opacity: 0.5,
    color: "white",
  };
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: "symbol", maxWidth: 120 },
    { field: "name", minWidth: 250 },
    {
      field: "change",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          line: {
            stroke: "rgb(52, 168, 83)",
          },
          highlightStyle: {
            size: 4,
            stroke: "rgb(52, 168, 83)",
            fill: "rgb(52, 168, 83)",
          },
          tooltip: {
            renderer: renderer,
          },
          crosshairs: {
            xLine: {
              enabled: true,
              lineDash: "dash",
              stroke: "rgba(0, 0, 0, 0.5)",
            },
            yLine: {
              enabled: true,
              lineDash: "dash",
              stroke: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      },
    },
    {
      field: "rateOfChange",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          line: {
            stroke: "rgb(168,52,137)",
          },
          highlightStyle: {
            size: 4,
            stroke: "rgb(168,52,137)",
            fill: "rgb(168,52,137)",
          },
          tooltip: {
            renderer: renderer,
          },
          crosshairs: {
            xLine: {
              enabled: false,
            },
          },
        },
      },
    },
    {
      field: "volume",
      type: "numericColumn",
      maxWidth: 140,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowHeight={50}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
