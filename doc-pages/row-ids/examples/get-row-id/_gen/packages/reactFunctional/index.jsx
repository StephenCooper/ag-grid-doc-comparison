"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([
    { id: "c1", make: "Toyota", model: "Celica", price: 35000 },
    { id: "c2", make: "Ford", model: "Mondeo", price: 32000 },
    { id: "c8", make: "Porsche", model: "Boxter", price: 72000 },
    { id: "c4", make: "BMW", model: "M50", price: 60000 },
    { id: "c14", make: "Aston Martin", model: "DBX", price: 190000 },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Row ID", valueGetter: "node.id" },
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);
  const getRowId = useCallback((params) => params.data.id, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          getRowId={getRowId}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
