"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

// defined and updated in data.js
var UPDATE_COUNT = 200;

const numberCellFormatter = (params) => {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

// makes a copy of the original and merges in the new values
const copyObject = (object) => {
  // start with new object
  var newObject = {};
  // copy in the old values
  Object.keys(object).forEach(function (key) {
    newObject[key] = object[key];
  });
  return newObject;
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    // these are the row groups, so they are all hidden (they are show in the group column)
    {
      headerName: "Product",
      field: "product",
      enableRowGroup: true,
      enablePivot: true,
      rowGroupIndex: 0,
      hide: true,
    },
    {
      headerName: "Portfolio",
      field: "portfolio",
      enableRowGroup: true,
      enablePivot: true,
      rowGroupIndex: 1,
      hide: true,
    },
    {
      headerName: "Book",
      field: "book",
      enableRowGroup: true,
      enablePivot: true,
      rowGroupIndex: 2,
      hide: true,
    },
    { headerName: "Trade", field: "trade", width: 100 },
    // all the other columns (visible and not grouped)
    {
      field: "current",
      width: 200,
      aggFunc: "sum",
      enableValue: true,
      cellClass: "number",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: "previous",
      width: 200,
      aggFunc: "sum",
      enableValue: true,
      cellClass: "number",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: "dealType",
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      headerName: "Bid",
      field: "bidFlag",
      enableRowGroup: true,
      enablePivot: true,
      width: 100,
    },
    {
      headerName: "PL 1",
      field: "pl1",
      width: 200,
      aggFunc: "sum",
      enableValue: true,
      cellClass: "number",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "PL 2",
      field: "pl2",
      width: 200,
      aggFunc: "sum",
      enableValue: true,
      cellClass: "number",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "Gain-DX",
      field: "gainDx",
      width: 200,
      aggFunc: "sum",
      enableValue: true,
      cellClass: "number",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "SX / PX",
      field: "sxPx",
      width: 200,
      aggFunc: "sum",
      enableValue: true,
      cellClass: "number",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "99 Out",
      field: "_99Out",
      width: 200,
      aggFunc: "sum",
      enableValue: true,
      cellClass: "number",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: "submitterID",
      width: 200,
      aggFunc: "sum",
      enableValue: true,
      cellClass: "number",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: "submitterDealID",
      width: 200,
      aggFunc: "sum",
      enableValue: true,
      cellClass: "number",
      valueFormatter: numberCellFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
  ]);
  const getRowId = useCallback(function (params) {
    return params.data.trade;
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      width: 120,
      sortable: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      width: 250,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    getData();
    setRowData(globalRowData);
  }, []);

  const onNormalUpdate = useCallback(() => {
    var startMillis = new Date().getTime();
    setMessage("Running Transaction");
    var api = gridRef.current.api;
    for (var i = 0; i < UPDATE_COUNT; i++) {
      setTimeout(function () {
        // pick one index at random
        var index = Math.floor(Math.random() * globalRowData.length);
        var itemToUpdate = globalRowData[index];
        var newItem = copyObject(itemToUpdate);
        // copy previous to current value
        newItem.previous = newItem.current;
        // then create new current value
        newItem.current = Math.floor(Math.random() * 100000) + 100;
        // do normal update. update is done before method returns
        api.applyTransaction({ update: [newItem] });
      }, 0);
    }
    // print message in next VM turn to allow browser to refresh first.
    // we assume the browser executes the timeouts in order they are created,
    // so this timeout executes after all the update timeouts created above.
    setTimeout(function () {
      var endMillis = new Date().getTime();
      var duration = endMillis - startMillis;
      setMessage("Transaction took " + duration.toLocaleString() + "ms");
    }, 0);
    function setMessage(msg) {
      var eMessage = document.querySelector("#eMessage");
      eMessage.innerHTML = msg;
    }
  }, []);

  const onAsyncUpdate = useCallback(() => {
    var startMillis = new Date().getTime();
    setMessage("Running Async");
    var updatedCount = 0;
    var api = gridRef.current.api;
    for (var i = 0; i < UPDATE_COUNT; i++) {
      setTimeout(function () {
        // pick one index at random
        var index = Math.floor(Math.random() * globalRowData.length);
        var itemToUpdate = globalRowData[index];
        var newItem = copyObject(itemToUpdate);
        // copy previous to current value
        newItem.previous = newItem.current;
        // then create new current value
        newItem.current = Math.floor(Math.random() * 100000) + 100;
        // update using async method. passing the callback is
        // optional, we are doing it here so we know when the update
        // was processed by the grid.
        api.applyTransactionAsync({ update: [newItem] }, resultCallback);
      }, 0);
    }
    function resultCallback() {
      updatedCount++;
      if (updatedCount === UPDATE_COUNT) {
        // print message in next VM turn to allow browser to refresh
        setTimeout(function () {
          var endMillis = new Date().getTime();
          var duration = endMillis - startMillis;
          setMessage("Async took " + duration.toLocaleString() + "ms");
        }, 0);
      }
    }
    function setMessage(msg) {
      var eMessage = document.querySelector("#eMessage");
      eMessage.innerHTML = msg;
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: "5px" }}>
          <button onClick={onNormalUpdate}>Normal Update</button>
          <button onClick={onAsyncUpdate}>Async Update</button>
          <span id="eMessage"></span>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            suppressAggFuncInHeader={true}
            animateRows={true}
            rowGroupPanelShow={"always"}
            pivotPanelShow={"always"}
            getRowId={getRowId}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
