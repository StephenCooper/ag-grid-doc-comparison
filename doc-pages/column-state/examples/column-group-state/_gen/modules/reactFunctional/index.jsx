"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Athlete",
      children: [
        { field: "athlete" },
        { field: "country", columnGroupShow: "open" },
        { field: "sport", columnGroupShow: "open" },
        { field: "year", columnGroupShow: "open" },
        { field: "date", columnGroupShow: "open" },
      ],
    },
    {
      headerName: "Medals",
      children: [
        { field: "total", columnGroupShow: "closed" },
        { field: "gold", columnGroupShow: "open" },
        { field: "silver", columnGroupShow: "open" },
        { field: "bronze", columnGroupShow: "open" },
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

  const saveState = useCallback(() => {
    window.groupState = gridRef.current.columnApi.getColumnGroupState();
    console.log("group state saved", window.groupState);
    console.log("column state saved");
  }, []);

  const restoreState = useCallback(() => {
    if (!window.groupState) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }
    gridRef.current.columnApi.setColumnGroupState(window.groupState);
    console.log("column state restored");
  }, []);

  const resetState = useCallback(() => {
    gridRef.current.columnApi.resetColumnGroupState();
    console.log("column state reset");
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <div className="example-section">
            Column State:
            <button onClick={saveState}>Save State</button>
            <button onClick={restoreState}>Restore State</button>
            <button onClick={resetState}>Reset State</button>
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
