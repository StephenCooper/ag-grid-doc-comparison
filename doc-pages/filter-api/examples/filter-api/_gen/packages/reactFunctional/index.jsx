"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

let savedMiniFilterText = "";

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", filter: "agSetColumnFilter" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));

    params.api.getToolPanelInstance("filters").expandFilters();
  }, []);

  const getMiniFilterText = useCallback(() => {
    const athleteFilter = gridRef.current.api.getFilterInstance("athlete");
    console.log(athleteFilter.getMiniFilter());
  }, []);

  const saveMiniFilterText = useCallback(() => {
    const athleteFilter = gridRef.current.api.getFilterInstance("athlete");
    savedMiniFilterText = athleteFilter.getMiniFilter();
  }, []);

  const restoreMiniFilterText = useCallback(() => {
    const athleteFilter = gridRef.current.api.getFilterInstance("athlete");
    athleteFilter.setMiniFilter(savedMiniFilterText);
  }, []);

  const resetFilter = useCallback(() => {
    const athleteFilter = gridRef.current.api.getFilterInstance("athlete");
    athleteFilter.setModel(null);
    gridRef.current.api.onFilterChanged();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <button onClick={getMiniFilterText}>Get Mini Filter Text</button>
          <button onClick={saveMiniFilterText}>Save Mini Filter Text</button>
          <button onClick={restoreMiniFilterText}>
            Restore Mini Filter Text
          </button>
          <button onClick={resetFilter}>Reset Filter</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={"filters"}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
