"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

var savedSort;

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete" },
    { field: "age", width: 90 },
    { field: "country" },
    { field: "year", width: 90 },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const sortByAthleteAsc = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: "athlete", sort: "asc" }],
      defaultState: { sort: null },
    });
  }, []);

  const sortByAthleteDesc = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: "athlete", sort: "desc" }],
      defaultState: { sort: null },
    });
  }, []);

  const sortByCountryThenSport = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: "country", sort: "asc", sortIndex: 0 },
        { colId: "sport", sort: "asc", sortIndex: 1 },
      ],
      defaultState: { sort: null },
    });
  }, []);

  const sortBySportThenCountry = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: "country", sort: "asc", sortIndex: 1 },
        { colId: "sport", sort: "asc", sortIndex: 0 },
      ],
      defaultState: { sort: null },
    });
  }, []);

  const clearSort = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      defaultState: { sort: null },
    });
  }, []);

  const saveSort = useCallback(() => {
    var colState = gridRef.current.columnApi.getColumnState();
    var sortState = colState
      .filter(function (s) {
        return s.sort != null;
      })
      .map(function (s) {
        return { colId: s.colId, sort: s.sort, sortIndex: s.sortIndex };
      });
    savedSort = sortState;
    console.log("saved sort", sortState);
  }, []);

  const restoreFromSave = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: savedSort,
      defaultState: { sort: null },
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: "1rem" }}>
          <div>
            <button onClick={sortByAthleteAsc}>Athlete Ascending</button>
            <button onClick={sortByAthleteDesc}>Athlete Descending</button>
            <button onClick={sortByCountryThenSport}>
              Country, then Sport
            </button>
            <button onClick={sortBySportThenCountry}>
              Sport, then Country
            </button>
          </div>
          <div style={{ marginTop: "0.25rem" }}>
            <button onClick={clearSort}>Clear Sort</button>
            <button onClick={saveSort}>Save Sort</button>
            <button onClick={restoreFromSave}>Restore from Save</button>
          </div>
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
