"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SparklinesModule } from "@ag-grid-enterprise/sparklines";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule]);

const colors = {
  firstLast: "rgb(253, 221, 96)",
  min: "rgb(239, 108, 0)",
  max: "rgb(59, 162, 114)",
  negative: "rgb(255, 110, 118)",
  positive: "rgba(0,128,0, 0.3)",
  highlighted: "rgb(88, 217, 249)",
};

const lineMarkerFormatter = (params) => {
  const { min, max, first, last, highlighted } = params;
  const color = highlighted
    ? colors.highlighted
    : min
    ? colors.min
    : max
    ? colors.max
    : colors.firstLast;
  return {
    size: highlighted || min || max || first || last ? 5 : 0,
    fill: color,
    stroke: color,
  };
};

const columnFormatter = (params) => {
  const { first, last, yValue, highlighted } = params;
  let fill = undefined;
  if (!highlighted) {
    if (first || last) {
      fill = colors.firstLast;
    } else if (yValue < 0) {
      fill = colors.negative;
    } else {
      fill = colors.positive;
    }
  } else {
    fill = colors.highlighted;
  }
  return { fill };
};

const areaMarkerFormatter = (params) => {
  const { min, max, first, last, highlighted } = params;
  const color = highlighted
    ? colors.highlighted
    : min
    ? colors.min
    : max
    ? colors.max
    : colors.firstLast;
  return {
    size: highlighted || min || max || first || last ? 5 : 0,
    fill: color,
    stroke: color,
  };
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "sparkline",
      headerName: "Line Sparkline",
      minWidth: 100,
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          line: {
            stroke: "rgb(124, 255, 178)",
            strokeWidth: 3,
          },
          padding: {
            top: 10,
            bottom: 10,
          },
          marker: {
            shape: "diamond",
            formatter: lineMarkerFormatter,
          },
        },
      },
    },
    {
      field: "sparkline",
      headerName: "Column Sparkline",
      minWidth: 100,
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "column",
          padding: {
            top: 10,
            bottom: 10,
          },
          formatter: columnFormatter,
        },
      },
    },
    {
      field: "sparkline",
      headerName: "Area Sparkline",
      minWidth: 100,
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "area",
          fill: "rgba(84, 112, 198, 0.3)",
          line: {
            stroke: "rgb(84, 112, 198)",
          },
          padding: {
            top: 10,
            bottom: 10,
          },
          marker: {
            formatter: areaMarkerFormatter,
          },
        },
      },
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
          rowHeight={70}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
