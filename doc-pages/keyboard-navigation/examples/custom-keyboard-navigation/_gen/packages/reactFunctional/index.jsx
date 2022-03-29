"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

// define some handy keycode constants
const KEY_LEFT = "ArrowLeft";

const KEY_UP = "ArrowUp";

const KEY_RIGHT = "ArrowRight";

const KEY_DOWN = "ArrowDown";

const moveHeaderFocusUpDown = (previousHeader, headerRowCount, isUp) => {
  const previousColumn = previousHeader.column;
  const lastRowIndex = previousHeader.headerRowIndex;
  let nextRowIndex = isUp ? lastRowIndex - 1 : lastRowIndex + 1;
  let nextColumn;
  if (nextRowIndex === -1) {
    return previousHeader;
  }
  if (nextRowIndex === headerRowCount) {
    nextRowIndex = -1;
  }
  const parentColumn = previousColumn.getParent();
  if (isUp) {
    nextColumn = parentColumn || previousColumn;
  } else {
    nextColumn = previousColumn.children
      ? previousColumn.children[0]
      : previousColumn;
  }
  return {
    headerRowIndex: nextRowIndex,
    column: nextColumn,
  };
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Athlete",
      children: [
        { field: "athlete", headerName: "Name", minWidth: 170 },
        { field: "age" },
        { field: "country" },
      ],
    },
    { field: "year" },
    { field: "sport" },
    {
      headerName: "Medals",
      children: [
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const navigateToNextHeader = useCallback((params) => {
    const nextHeader = params.nextHeaderPosition;
    if (params.key !== "ArrowDown" && params.key !== "ArrowUp") {
      return nextHeader;
    }
    const processedNextHeader = moveHeaderFocusUpDown(
      params.previousHeaderPosition,
      params.headerRowCount,
      params.key === "ArrowDown"
    );
    return processedNextHeader === nextHeader ? null : processedNextHeader;
  }, []);

  const tabToNextHeader = useCallback((params) => {
    return moveHeaderFocusUpDown(
      params.previousHeaderPosition,
      params.headerRowCount,
      params.backwards
    );
  }, []);

  const tabToNextCell = useCallback((params) => {
    const previousCell = params.previousCellPosition;
    const lastRowIndex = previousCell.rowIndex;
    let nextRowIndex = params.backwards ? lastRowIndex - 1 : lastRowIndex + 1;
    const renderedRowCount = gridRef.current.api.getModel().getRowCount();
    if (nextRowIndex < 0) {
      nextRowIndex = -1;
    }
    if (nextRowIndex >= renderedRowCount) {
      nextRowIndex = renderedRowCount - 1;
    }
    const result = {
      rowIndex: nextRowIndex,
      column: previousCell.column,
      rowPinned: previousCell.rowPinned,
    };
    return result;
  }, []);

  const navigateToNextCell = useCallback((params) => {
    const previousCell = params.previousCellPosition,
      suggestedNextCell = params.nextCellPosition;
    let nextRowIndex, renderedRowCount;
    switch (params.key) {
      case KEY_DOWN:
        // return the cell above
        nextRowIndex = previousCell.rowIndex - 1;
        if (nextRowIndex < -1) {
          return null;
        } // returning null means don't navigate
        return {
          rowIndex: nextRowIndex,
          column: previousCell.column,
          rowPinned: previousCell.rowPinned,
        };
      case KEY_UP:
        // return the cell below
        nextRowIndex = previousCell.rowIndex + 1;
        renderedRowCount = gridRef.current.api.getModel().getRowCount();
        if (nextRowIndex >= renderedRowCount) {
          return null;
        } // returning null means don't navigate
        return {
          rowIndex: nextRowIndex,
          column: previousCell.column,
          rowPinned: previousCell.rowPinned,
        };
      case KEY_LEFT:
      case KEY_RIGHT:
        return suggestedNextCell;
      default:
        throw Error(
          "this will never happen, navigation is always one of the 4 keys above"
        );
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          navigateToNextHeader={navigateToNextHeader}
          tabToNextHeader={tabToNextHeader}
          tabToNextCell={tabToNextCell}
          navigateToNextCell={navigateToNextCell}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
