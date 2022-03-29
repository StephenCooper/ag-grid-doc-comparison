"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import CustomHeader from "./customHeader.jsx";

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      headerComponent: CustomHeader,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const onBtUpperNames = useCallback(() => {
    const columnDefs = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.headerName = c.field.toUpperCase();
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  const onBtLowerNames = useCallback(() => {
    const columnDefs = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.headerName = c.field;
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  const onBtFilterOn = useCallback(() => {
    const columnDefs = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.filter = true;
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  const onBtFilterOff = useCallback(() => {
    const columnDefs = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.filter = false;
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  const onBtResizeOn = useCallback(() => {
    const columnDefs = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.resizable = true;
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  const onBtResizeOff = useCallback(() => {
    const columnDefs = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    columnDefs.forEach(function (c) {
      c.resizable = false;
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={onBtUpperNames}>Upper Header Names</button>
          <button onClick={onBtLowerNames}>Lower Lower Names</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={onBtFilterOn}>Filter On</button>
          <button onClick={onBtFilterOff}>Filter Off</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={onBtResizeOn}>Resize On</button>
          <button onClick={onBtResizeOff}>Resize Off</button>
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
