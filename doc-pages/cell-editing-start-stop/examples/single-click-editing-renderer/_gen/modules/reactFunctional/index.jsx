"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const getRenderer = () => {
  class CellRenderer {
    createGui() {
      const template =
        '<span><button id="theButton" style="height: 39px">#</button><span id="theValue" style="padding-left: 4px;"></span></span>';
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = template;
      this.eGui = tempDiv.firstElementChild;
    }
    init(params) {
      // create the gui
      this.createGui();
      // keep params, we use it in onButtonClicked
      this.params = params;
      // attach the value to the value span
      const eValue = this.eGui.querySelector("#theValue");
      eValue.innerHTML = params.value;
      // setup the button, first get reference to it
      this.eButton = this.eGui.querySelector("#theButton");
      // bind the listener so 'this' is preserved, also keep reference to it for removal
      this.buttonClickListener = this.onButtonClicked.bind(this);
      // add the listener
      this.eButton.addEventListener("click", this.buttonClickListener);
    }
    onButtonClicked() {
      // start editing this cell. see the docs on the params that this method takes
      const startEditingParams = {
        rowIndex: this.params.rowIndex,
        colKey: this.params.column.getId(),
      };
      this.params.api.startEditingCell(startEditingParams);
    }
    getGui() {
      // returns our gui to the grid for this cell
      return this.eGui;
    }
    refresh() {
      return false;
    }
    destroy() {
      // be good, clean up the listener
      this.eButton.removeEventListener("click", this.buttonClickListener);
    }
  }
  return CellRenderer;
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", minWidth: 180 },
    { field: "age" },
    { field: "country", minWidth: 160 },
    { field: "year" },
    { field: "date", minWidth: 160 },
    { field: "sport", minWidth: 180 },
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
      // we use a cell renderer to include a button, so when the button
      // gets clicked, the editing starts.
      cellRenderer: getRenderer(),
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressClickEdit={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
