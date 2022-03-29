"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const getColumnDefs = () => {
  return [
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 100,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState(getColumnDefs());

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const setHeaderNames = useCallback(() => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.headerName = "C" + index;
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  const removeHeaderNames = useCallback(() => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.headerName = undefined;
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  const setValueFormatters = useCallback(() => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.valueFormatter = function (params) {
        return "[ " + params.value + " ]";
      };
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  const removeValueFormatters = useCallback(() => {
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.valueFormatter = undefined;
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={setHeaderNames}>Set Header Names</button>
          <button onClick={removeHeaderNames}>Remove Header Names</button>
          <button onClick={setValueFormatters}>Set Value Formatters</button>
          <button onClick={removeValueFormatters}>
            Remove Value Formatters
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
