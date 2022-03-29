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
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", minWidth: 150 },
    { field: "age", maxWidth: 90 },
    { field: "country", minWidth: 150 },
    { field: "year", maxWidth: 90 },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
    };
  }, []);
  const processCellForClipboard = useCallback(function (params) {
    if (
      params.column.getColId() === "athlete" &&
      params.value &&
      params.value.toUpperCase
    ) {
      return params.value.toUpperCase();
    }
    return params.value;
  }, []);
  const processCellFromClipboard = useCallback(function (params) {
    if (
      params.column.getColId() === "athlete" &&
      params.value &&
      params.value.toLowerCase
    ) {
      return params.value.toLowerCase();
    }
    return params.value;
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onRangeSelectionChanged = useCallback((event) => {
    var lbRangeCount = document.querySelector("#lbRangeCount");
    var lbEagerSum = document.querySelector("#lbEagerSum");
    var lbLazySum = document.querySelector("#lbLazySum");
    var cellRanges = gridRef.current.api.getCellRanges();
    // if no selection, clear all the results and do nothing more
    if (!cellRanges || cellRanges.length === 0) {
      lbRangeCount.innerHTML = "0";
      lbEagerSum.innerHTML = "-";
      lbLazySum.innerHTML = "-";
      return;
    }
    // set range count to the number of ranges selected
    lbRangeCount.innerHTML = cellRanges.length + "";
    var sum = 0;
    var api = gridRef.current.api;
    if (cellRanges) {
      cellRanges.forEach(function (range) {
        // get starting and ending row, remember rowEnd could be before rowStart
        var startRow = Math.min(range.startRow.rowIndex, range.endRow.rowIndex);
        var endRow = Math.max(range.startRow.rowIndex, range.endRow.rowIndex);
        for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
          range.columns.forEach(function (column) {
            var rowModel = api.getModel();
            var rowNode = rowModel.getRow(rowIndex);
            var value = api.getValue(column, rowNode);
            if (typeof value === "number") {
              sum += value;
            }
          });
        }
      });
    }
    lbEagerSum.innerHTML = sum + "";
    if (event.started) {
      lbLazySum.innerHTML = "?";
    }
    if (event.finished) {
      lbLazySum.innerHTML = sum + "";
    }
  }, []);

  const onAddRange = useCallback(() => {
    gridRef.current.api.addCellRange({
      rowStartIndex: 4,
      rowEndIndex: 8,
      columnStart: "age",
      columnEnd: "date",
    });
  }, []);

  const onClearRange = useCallback(() => {
    gridRef.current.api.clearRangeSelection();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <button onClick={onAddRange}>Add Range</button>
          <button onClick={onClearRange}>Clear Range</button>
          Range Count:
          <span id="lbRangeCount" style={{ paddingRight: "20px" }}></span>
          Eager Sum:
          <span id="lbEagerSum" style={{ paddingRight: "20px" }}></span>
          Lazy Sum:
          <span id="lbLazySum" style={{ paddingRight: "20px" }}></span>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection={true}
            processCellForClipboard={processCellForClipboard}
            processCellFromClipboard={processCellFromClipboard}
            onGridReady={onGridReady}
            onRangeSelectionChanged={onRangeSelectionChanged}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
