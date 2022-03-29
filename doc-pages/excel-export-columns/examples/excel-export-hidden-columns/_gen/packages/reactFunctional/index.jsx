"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const getBoolean = (id) => {
  return !!document.querySelector("#" + id).checked;
};

const getParams = () => {
  return {
    allColumns: getBoolean("allColumns"),
  };
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Top Level Column Group",
      children: [
        {
          headerName: "Group A",
          children: [
            { field: "athlete", minWidth: 200 },
            { field: "country", minWidth: 200 },
            { headerName: "Group", valueGetter: "data.country.charAt(0)" },
          ],
        },
        {
          headerName: "Group B",
          children: [
            { field: "sport", minWidth: 150 },
            { field: "gold", hide: true },
            { field: "silver", hide: true },
            { field: "bronze", hide: true },
            { field: "total", hide: true },
          ],
        },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data.filter((rec) => rec.country != null)));
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel(getParams());
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="columns">
          <label className="option" for="allColumns">
            <input id="allColumns" type="checkbox" />
            All Columns
          </label>
          <div>
            <button onClick={onBtExport} style={{ fontWeight: "bold" }}>
              Export to Excel
            </button>
          </div>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              popupParent={popupParent}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
