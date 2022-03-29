"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RangeSelectionModule,
  ClipboardModule,
]);

const disable = (id, disabled) => {
  document.querySelector(id).disabled = disabled;
};

const setValue = (id, value) => {
  document.querySelector(id).value = value;
};

const getRows = () => {
  return Array.apply(null, Array(100)).map(function (_, i) {
    return {
      a: "a-" + i,
      b: "b-" + i,
      c: "c-" + i,
      d: "d-" + i,
      e: "e-" + i,
      f: "f-" + i,
      g: "g-" + i,
      h: "h-" + i,
    };
  });
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getRows());
  const [columnDefs, setColumnDefs] = useState([
    { field: "a" },
    { field: "b" },
    { field: "c" },
    { field: "d" },
    { field: "e" },
    { field: "f" },
    { field: "g" },
    { field: "h" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
    };
  }, []);

  const onFirstDataRendered = useCallback(() => {
    setValue("#undoInput", 0);
    disable("#undoInput", true);
    disable("#undoBtn", true);
    setValue("#redoInput", 0);
    disable("#redoInput", true);
    disable("#redoBtn", true);
  }, []);

  const onCellValueChanged = useCallback((params) => {
    var undoSize = gridRef.current.api.getCurrentUndoSize();
    setValue("#undoInput", undoSize);
    disable("#undoBtn", undoSize < 1);
    var redoSize = gridRef.current.api.getCurrentRedoSize();
    setValue("#redoInput", redoSize);
    disable("#redoBtn", redoSize < 1);
  }, []);

  const undo = useCallback(() => {
    gridRef.current.api.undoCellEditing();
  }, []);

  const redo = useCallback(() => {
    gridRef.current.api.redoCellEditing();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div>
          <span className="button-group">
            <label>Available Undo's</label>
            <input id="undoInput" className="undo-redo-input" />
            <label>Available Redo's</label>
            <input id="redoInput" className="undo-redo-input" />
            <button id="undoBtn" className="undo-btn" onClick={undo}>
              Undo
            </button>
            <button id="redoBtn" className="redo-btn" onClick={redo}>
              Redo
            </button>
          </span>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection={true}
            enableFillHandle={true}
            undoRedoCellEditing={true}
            undoRedoCellEditingLimit={5}
            enableCellChangeFlash={true}
            onFirstDataRendered={onFirstDataRendered}
            onCellValueChanged={onCellValueChanged}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
