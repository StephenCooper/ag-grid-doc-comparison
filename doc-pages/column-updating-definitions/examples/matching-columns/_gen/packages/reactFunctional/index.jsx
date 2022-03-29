"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

const athleteColumn = {
  headerName: "Athlete",
  valueGetter: function (params) {
    return params.data.athlete;
  },
};

const getColDefsMedalsIncluded = () => {
  return [
    athleteColumn,
    {
      colId: "myAgeCol",
      headerName: "Age",
      valueGetter: function (params) {
        return params.data.age;
      },
    },
    {
      headerName: "Country",
      headerClass: "country-header",
      valueGetter: function (params) {
        return params.data.country;
      },
    },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
};

const getColDefsMedalsExcluded = () => {
  return [
    athleteColumn,
    {
      colId: "myAgeCol",
      headerName: "Age",
      valueGetter: function (params) {
        return params.data.age;
      },
    },
    {
      headerName: "Country",
      headerClass: "country-header",
      valueGetter: function (params) {
        return params.data.country;
      },
    },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
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
  const [columnDefs, setColumnDefs] = useState(getColDefsMedalsIncluded());

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onBtExcludeMedalColumns = useCallback(() => {
    gridRef.current.api.setColumnDefs(getColDefsMedalsExcluded());
  }, []);

  const onBtIncludeMedalColumns = useCallback(() => {
    gridRef.current.api.setColumnDefs(getColDefsMedalsIncluded());
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={onBtIncludeMedalColumns}>
            Include Medal Columns
          </button>
          <button onClick={onBtExcludeMedalColumns}>
            Exclude Medal Columns
          </button>
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
