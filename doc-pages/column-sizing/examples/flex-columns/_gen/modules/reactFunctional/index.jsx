"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

var colSpan = function (params) {
  return params.data === 2 ? 3 : 1;
};

const fillAllCellsWithWidthMeasurement = () => {
  Array.prototype.slice
    .call(document.querySelectorAll(".ag-cell"))
    .forEach(function (cell) {
      var width = cell.offsetWidth;
      var isFullWidthRow = cell.parentElement.childNodes.length === 1;
      cell.textContent = (isFullWidthRow ? "Total width: " : "") + width + "px";
    });
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([1, 2]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "A",
      field: "author",
      width: 300,
      colSpan: colSpan,
    },
    {
      headerName: "Flexed Columns",
      children: [
        {
          headerName: "B",
          minWidth: 200,
          maxWidth: 350,
          flex: 2,
        },
        {
          headerName: "C",
          flex: 1,
        },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    setInterval(fillAllCellsWithWidthMeasurement, 50);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
