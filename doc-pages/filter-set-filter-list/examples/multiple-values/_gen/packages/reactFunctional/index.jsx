"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useState } from "react";
import { render } from "react-dom";

var valueGetter = function (params) {
  return params.data["animalsString"].split("|");
};

var valueFormatter = function (params) {
  return params.value
    .map(function (animal) {
      return animal.name;
    })
    .join(", ");
};

var keyCreator = function (params) {
  return params.value.map(function (animal) {
    return animal.name;
  });
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Animals (array)",
      field: "animalsArray",
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Animals (string)",
      filter: "agSetColumnFilter",
      valueGetter: valueGetter,
    },
    {
      headerName: "Animals (objects)",
      field: "animalsObjects",
      filter: "agSetColumnFilter",
      valueFormatter: valueFormatter,
      keyCreator: keyCreator,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={"filters"}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
