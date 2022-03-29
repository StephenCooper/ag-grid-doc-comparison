"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  SetFilterModule,
]);

var rowIdCounter = 0;

var callCount = 0;

const createRowData = () => {
  var result = [];
  for (var i = 1; i <= 2; i++) {
    for (var j = 1; j <= 5; j++) {
      for (var k = 1; k <= 3; k++) {
        var rowDataItem = createRowItem(i, j, k);
        result.push(rowDataItem);
      }
    }
  }
  return result;
};

const createRowItem = (i, j, k) => {
  var rowDataItem = {
    id: rowIdCounter++,
    a: (j * k * 863) % 100,
    b: (j * k * 811) % 100,
    c: (j * k * 743) % 100,
    d: (j * k * 677) % 100,
    topGroup: "Bottom",
    group: "Group B" + j,
  };
  if (i === 1) {
    rowDataItem.topGroup = "Top";
    rowDataItem.group = "Group A" + j;
  }
  return rowDataItem;
};

// converts strings to numbers
const numberValueParser = (params) => {
  console.log("=> updating to " + params.newValue);
  return Number(params.newValue);
};

const pickRandomColumn = () => {
  var letters = ["a", "b", "c", "d"];
  var randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
};

const createRandomNumber = () => {
  return Math.floor(Math.random() * 100);
};

const pickExistingRowItemAtRandom = (gridApi) => {
  var rowNode = pickExistingRowNodeAtRandom(gridApi);
  return rowNode ? rowNode.data : null;
};

const pickExistingRowNodeAtRandom = (gridApi) => {
  var allItems = [];
  gridApi.forEachLeafNode(function (rowNode) {
    allItems.push(rowNode);
  });
  if (allItems.length === 0) {
    return undefined;
  }
  var result = allItems[Math.floor(Math.random() * allItems.length)];
  return result;
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "topGroup", rowGroup: true, hide: true },
    { field: "group", rowGroup: true, hide: true },
    { headerName: "ID", field: "id", cellClass: "number-cell", maxWidth: 70 },
    { field: "a", type: "valueColumn" },
    { field: "b", type: "valueColumn" },
    { field: "c", type: "valueColumn" },
    { field: "d", type: "valueColumn" },
    {
      headerName: "Total",
      type: "totalColumn",
      minWidth: 120,
      // we use getValue() instead of data.a so that it gets the aggregated values at the group level
      valueGetter:
        'getValue("a") + getValue("b") + getValue("c") + getValue("d")',
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 180,
    };
  }, []);
  const columnTypes = useMemo(() => {
    return {
      valueColumn: {
        editable: true,
        aggFunc: "sum",
        cellClass: "number-cell",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        filter: "agNumberColumnFilter",
        valueParser: numberValueParser,
      },
      totalColumn: {
        cellRenderer: "agAnimateShowChangeCellRenderer",
        cellClass: "number-cell",
      },
    };
  }, []);
  const aggFuncs = useMemo(() => {
    return {
      sum: function (params) {
        var values = params && params.values ? params.values : [];
        var result = 0;
        if (values) {
          values.forEach(function (value) {
            if (typeof value === "number") {
              result += value;
            }
          });
        }
        callCount++;
        console.log(
          callCount +
            " aggregation: sum([" +
            values.join(",") +
            "]) = " +
            result
        );
        return result;
      },
    };
  }, []);
  const getRowId = useCallback(function (params) {
    return params.data.id;
  }, []);

  const onGridReady = useCallback((params) => {
    setRowData(createRowData());
  }, []);

  const updateOneRecord = useCallback(() => {
    var rowNodeToUpdate = pickExistingRowNodeAtRandom(gridRef.current.api);
    if (!rowNodeToUpdate) return;
    var randomValue = createRandomNumber();
    var randomColumnId = pickRandomColumn();
    console.log(
      "updating " + randomColumnId + " to " + randomValue + " on ",
      rowNodeToUpdate.data
    );
    rowNodeToUpdate.setDataValue(randomColumnId, randomValue);
  }, []);

  const updateUsingTransaction = useCallback(() => {
    var itemToUpdate = pickExistingRowItemAtRandom(gridRef.current.api);
    if (!itemToUpdate) {
      return;
    }
    console.log("updating - before", itemToUpdate);
    itemToUpdate[pickRandomColumn()] = createRandomNumber();
    itemToUpdate[pickRandomColumn()] = createRandomNumber();
    var transaction = {
      update: [itemToUpdate],
    };
    console.log("updating - after", itemToUpdate);
    gridRef.current.api.applyTransaction(transaction);
  }, []);

  const removeUsingTransaction = useCallback(() => {
    var itemToRemove = pickExistingRowItemAtRandom(gridRef.current.api);
    if (!itemToRemove) {
      return;
    }
    var transaction = {
      remove: [itemToRemove],
    };
    console.log("removing", itemToRemove);
    gridRef.current.api.applyTransaction(transaction);
  }, []);

  const addUsingTransaction = useCallback(() => {
    var i = Math.floor(Math.random() * 2);
    var j = Math.floor(Math.random() * 5);
    var k = Math.floor(Math.random() * 3);
    var newItem = createRowItem(i, j, k);
    var transaction = {
      add: [newItem],
    };
    console.log("adding", newItem);
    gridRef.current.api.applyTransaction(transaction);
  }, []);

  const changeGroupUsingTransaction = useCallback(() => {
    var itemToUpdate = pickExistingRowItemAtRandom(gridRef.current.api);
    if (!itemToUpdate) {
      return;
    }
    itemToUpdate.topGroup = itemToUpdate.topGroup === "Top" ? "Bottom" : "Top";
    var transaction = {
      update: [itemToUpdate],
    };
    console.log("updating", itemToUpdate);
    gridRef.current.api.applyTransaction(transaction);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="parent-container">
        <div className="top-container">
          <button onClick={updateOneRecord}>Update One Value</button>
          <button onClick={updateUsingTransaction}>
            Update Using Transaction
          </button>
          <button onClick={removeUsingTransaction}>
            Remove Using Transaction
          </button>
          <button onClick={addUsingTransaction}>Add Using Transaction</button>
          <button onClick={changeGroupUsingTransaction}>
            Change Group Using Transaction
          </button>
        </div>
        <div className="center-container">
          <div style={gridStyle} className="ag-theme-alpine-dark">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              autoGroupColumnDef={autoGroupColumnDef}
              columnTypes={columnTypes}
              aggregateOnlyChangedColumns={true}
              aggFuncs={aggFuncs}
              groupDefaultExpanded={1}
              suppressAggFuncInHeader={true}
              animateRows={true}
              getRowId={getRowId}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
