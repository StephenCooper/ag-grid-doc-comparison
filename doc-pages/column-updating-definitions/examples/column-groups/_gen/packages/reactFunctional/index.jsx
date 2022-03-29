"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const createColSetA = () => {
  return [
    {
      headerName: "Group A",
      groupId: "groupA",
      children: [
        { field: "athlete" },
        { field: "age" },
        { field: "country", columnGroupShow: "open" },
      ],
    },
    {
      headerName: "Group B",
      children: [
        { field: "sport" },
        { field: "year" },
        { field: "date", columnGroupShow: "open" },
      ],
    },
    {
      headerName: "Group C",
      groupId: "groupC",
      children: [
        { field: "total" },
        { field: "gold", columnGroupShow: "open" },
        { field: "silver", columnGroupShow: "open" },
        { field: "bronze", columnGroupShow: "open" },
      ],
    },
  ];
};

const createColSetB = () => {
  return [
    {
      headerName: "GROUP A",
      groupId: "groupA",
      children: [
        { field: "athlete" },
        { field: "age" },
        { field: "country", columnGroupShow: "open" },
      ],
    },
    {
      headerName: "Group B",
      children: [
        { field: "sport" },
        { field: "year" },
        { field: "date", columnGroupShow: "open" },
      ],
    },
    {
      headerName: "Group C",
      groupId: "groupC",
      children: [
        { field: "total" },
        { field: "gold", columnGroupShow: "open" },
        { field: "silver", columnGroupShow: "open" },
        { field: "bronze", columnGroupShow: "open" },
        { field: "extraA" },
        { field: "extraB", columnGroupShow: "open" },
      ],
    },
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
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Group A",
      groupId: "groupA",
      children: [
        { field: "athlete" },
        { field: "age" },
        { field: "country", columnGroupShow: "open" },
      ],
    },
    {
      headerName: "Group B",
      children: [
        { field: "sport" },
        { field: "year" },
        { field: "date", columnGroupShow: "open" },
      ],
    },
    {
      headerName: "Group C",
      groupId: "groupC",
      children: [
        { field: "total" },
        { field: "gold", columnGroupShow: "open" },
        { field: "silver", columnGroupShow: "open" },
        { field: "bronze", columnGroupShow: "open" },
      ],
    },
  ]);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const onBtSetA = useCallback(() => {
    gridRef.current.api.setColumnDefs(createColSetA());
  }, []);

  const onBtSetB = useCallback(() => {
    gridRef.current.api.setColumnDefs(createColSetB());
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={onBtSetA}>First Column Set</button>
          <button onClick={onBtSetB}>Second Column Set</button>
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
