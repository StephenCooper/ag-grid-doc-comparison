"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Everything Resizes",
      children: [
        {
          field: "athlete",
          headerClass: "resizable-header",
        },
        { field: "age", headerClass: "resizable-header" },
        {
          field: "country",
          headerClass: "resizable-header",
        },
      ],
    },
    {
      headerName: "Only Year Resizes",
      children: [
        { field: "year", headerClass: "resizable-header" },
        {
          field: "date",
          resizable: false,
          headerClass: "fixed-size-header",
        },
        {
          field: "sport",
          resizable: false,
          headerClass: "fixed-size-header",
        },
      ],
    },
    {
      headerName: "Nothing Resizes",
      children: [
        {
          field: "gold",
          resizable: false,
          headerClass: "fixed-size-header",
        },
        {
          field: "silver",
          resizable: false,
          headerClass: "fixed-size-header",
        },
        {
          field: "bronze",
          resizable: false,
          headerClass: "fixed-size-header",
        },
        {
          field: "total",
          resizable: false,
          headerClass: "fixed-size-header",
        },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 150,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="legend-bar">
          <span className="legend-box resizable-header"></span> Resizable Column
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="legend-box fixed-size-header"></span> Fixed Width
          Column
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
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
