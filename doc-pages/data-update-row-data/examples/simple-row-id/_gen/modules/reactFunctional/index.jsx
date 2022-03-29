"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// specify the data
var rowDataA = [
  { id: "1", make: "Toyota", model: "Celica", price: 35000 },
  { id: "4", make: "BMW", model: "M50", price: 60000 },
  { id: "5", make: "Aston Martin", model: "DBX", price: 190000 },
];

var rowDataB = [
  { id: "1", make: "Toyota", model: "Celica", price: 35000 },
  { id: "2", make: "Ford", model: "Mondeo", price: 32000 },
  { id: "3", make: "Porsche", model: "Boxter", price: 72000 },
  { id: "4", make: "BMW", model: "M50", price: 60000 },
  { id: "5", make: "Aston Martin", model: "DBX", price: 190000 },
];

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(rowDataA);
  const [columnDefs, setColumnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);
  const getRowId = useCallback((params) => params.data.id, []);

  const onRowDataA = useCallback(() => {
    setRowData(rowDataA);
  }, []);

  const onRowDataB = useCallback(() => {
    setRowData(rowDataB);
  }, []);

  return (
    <div style={containerStyle}>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "5px", minHeight: "30px" }}>
          <button onClick={onRowDataA}>Row Data A</button>
          <button onClick={onRowDataB}>Row Data B</button>
        </div>
        <div style={{ flex: "1 1 0px" }}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              rowSelection={"single"}
              animateRows={true}
              getRowId={getRowId}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
