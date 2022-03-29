"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// placing in 13 rows, so there are exactly enough rows to fill the grid, makes
// the row animation look nice when you see all the rows
var data = [];

var topRowData = [];

var bottomRowData = [];

const createData = (count) => {
  var result = [];
  for (var i = 1; i <= count; i++) {
    result.push({
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return result;
};

const isForceRefreshSelected = () => {
  return document.querySelector("#forceRefresh").checked;
};

const isSuppressFlashSelected = () => {
  return document.querySelector("#suppressFlash").checked;
};

const callRefreshAfterMillis = (params, millis, gridApi) => {
  setTimeout(function () {
    gridApi.refreshCells(params);
  }, millis);
};

const scramble = () => {
  data.forEach(scrambleItem);
  topRowData.forEach(scrambleItem);
  bottomRowData.forEach(scrambleItem);
};

const scrambleItem = (item) => {
  ["a", "b", "c", "d", "e", "f"].forEach(function (colId) {
    // skip 50% of the cells so updates are random
    if (Math.random() > 0.5) {
      return;
    }
    item[colId] = Math.floor(Math.random() * 100);
  });
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: "a", suppressCellFlash: true },
    { field: "b" },
    { field: "c" },
    { field: "d" },
    { field: "e" },
    { field: "f" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);
  const pinnedTopRowData = useMemo(() => {
    return [];
  }, []);
  const pinnedBottomRowData = useMemo(() => {
    return [];
  }, []);

  const onGridReady = useCallback((params) => {
    // placing in 13 rows, so there are exactly enough rows to fill the grid, makes
    // the row animation look nice when you see all the rows
    data = createData(14);
    topRowData = createData(2);
    bottomRowData = createData(2);
    setRowData(data);
    params.api.setPinnedTopRowData(topRowData);
    params.api.setPinnedBottomRowData(bottomRowData);
  }, []);

  const scrambleAndRefreshAll = useCallback(() => {
    scramble();
    var params = {
      force: isForceRefreshSelected(),
      suppressFlash: isSuppressFlashSelected(),
    };
    gridRef.current.api.refreshCells(params);
  }, []);

  const scrambleAndRefreshLeftToRight = useCallback(() => {
    scramble();
    var api = gridRef.current.api;
    ["a", "b", "c", "d", "e", "f"].forEach(function (col, index) {
      var millis = index * 100;
      var params = {
        force: isForceRefreshSelected(),
        suppressFlash: isSuppressFlashSelected(),
        columns: [col],
      };
      callRefreshAfterMillis(params, millis, api);
    });
  }, []);

  const scrambleAndRefreshTopToBottom = useCallback(() => {
    scramble();
    var frame = 0;
    var i;
    var rowNode;
    var api = gridRef.current.api;
    for (i = 0; i < api.getPinnedTopRowCount(); i++) {
      rowNode = api.getPinnedTopRow(i);
      refreshRow(rowNode, api);
    }
    for (i = 0; i < gridRef.current.api.getDisplayedRowCount(); i++) {
      rowNode = gridRef.current.api.getDisplayedRowAtIndex(i);
      refreshRow(rowNode, api);
    }
    for (i = 0; i < gridRef.current.api.getPinnedBottomRowCount(); i++) {
      rowNode = gridRef.current.api.getPinnedBottomRow(i);
      refreshRow(rowNode, api);
    }
    function refreshRow(rowNode, api) {
      var millis = frame++ * 100;
      var rowNodes = [rowNode]; // params needs an array
      var params = {
        force: isForceRefreshSelected(),
        suppressFlash: isSuppressFlashSelected(),
        rowNodes: rowNodes,
      };
      callRefreshAfterMillis(params, millis, api);
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <div>
            <button onClick={scrambleAndRefreshAll}>
              Scramble &amp; Refresh All
            </button>
            <button onClick={scrambleAndRefreshLeftToRight}>
              Scramble &amp; Refresh Left to Right
            </button>
            <button onClick={scrambleAndRefreshTopToBottom}>
              Scramble &amp; Refresh Top to Bottom
            </button>
          </div>
          <div>
            <label>
              <input type="checkbox" id="forceRefresh" />
              Force Refresh
            </label>
            <label>
              <input type="checkbox" id="suppressFlash" />
              Suppress Flash
            </label>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pinnedTopRowData={pinnedTopRowData}
            pinnedBottomRowData={pinnedBottomRowData}
            enableCellChangeFlash={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
