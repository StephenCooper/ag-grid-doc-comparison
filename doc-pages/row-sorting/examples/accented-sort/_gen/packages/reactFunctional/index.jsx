"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useState } from "react";
import { render } from "react-dom";

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([
    { accented: "aáàä" },
    { accented: "aàáä" },
    { accented: "aäàá" },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    { field: "accented", width: 150 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
    };
  }, []);
  const sortingOrder = useMemo(() => {
    return ["desc", "asc", null];
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          sortingOrder={sortingOrder}
          accentedSort={true}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
