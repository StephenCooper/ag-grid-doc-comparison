"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "93%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", minWidth: 200 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onCellValueChanged = useCallback((params) => {
    console.log("Callback onCellValueChanged:", params);
  }, []);

  const onPasteStart = useCallback((params) => {
    console.log("Callback onPasteStart:", params);
  }, []);

  const onPasteEnd = useCallback((params) => {
    console.log("Callback onPasteEnd:", params);
  }, []);

  const onBtCopyRows = useCallback(() => {
    gridRef.current.api.copySelectedRowsToClipboard();
  }, []);

  const onBtCopyRange = useCallback(() => {
    gridRef.current.api.copySelectedRangeToClipboard();
  }, []);

  const onPasteOff = useCallback(() => {
    gridRef.current.api.setSuppressClipboardPaste(true);
  }, []);

  const onPasteOn = useCallback(() => {
    gridRef.current.api.setSuppressClipboardPaste(false);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ paddingBottom: "5px" }}>
        <button onClick={onBtCopyRows}>Copy Selected Rows to Clipboard</button>
        <button onClick={onBtCopyRange}>
          Copy Selected Range to Clipboard
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={onPasteOn}>Toggle Paste On</button>
        <button onClick={onPasteOff}>Toggle Paste Off</button>
      </div>

      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          rowSelection={"multiple"}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
          onPasteStart={onPasteStart}
          onPasteEnd={onPasteEnd}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
