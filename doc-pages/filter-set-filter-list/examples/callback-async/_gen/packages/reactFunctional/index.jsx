"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useState } from "react";
import { render } from "react-dom";

var filterParams = {
  values: function (params) {
    setTimeout(function () {
      params.success(["value 1", "value 2"]);
    }, 3000);
  },
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([
    { value: "value 1" },
    { value: "value 1" },
    { value: "value 1" },
    { value: "value 1" },
    { value: "value 2" },
    { value: "value 2" },
    { value: "value 2" },
    { value: "value 2" },
    { value: "value 2" },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Set filter column",
      field: "value",
      flex: 1,
      filter: "agSetColumnFilter",
      floatingFilter: true,
      filterParams: filterParams,
    },
  ]);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
