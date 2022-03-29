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

const columnDefsMedalsIncluded = [
  { field: "athlete" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
  { field: "age" },
  { field: "country" },
  { field: "sport" },
  { field: "year" },
  { field: "date" },
];

const colDefsMedalsExcluded = [
  { field: "athlete" },
  { field: "age" },
  { field: "country" },
  { field: "sport" },
  { field: "year" },
  { field: "date" },
];

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState(columnDefsMedalsIncluded);
  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 100,
      sortable: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onBtExcludeMedalColumns = useCallback(() => {
    gridRef.current.api.setColumnDefs(colDefsMedalsExcluded);
  }, []);

  const onBtIncludeMedalColumns = useCallback(() => {
    gridRef.current.api.setColumnDefs(columnDefsMedalsIncluded);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={onBtExcludeMedalColumns}>
            Exclude Medal Columns
          </button>
          <button onClick={onBtIncludeMedalColumns}>
            Include Medal Columns
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
