"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import GenderRenderer from "./genderRenderer.jsx";
import MoodRenderer from "./moodRenderer.jsx";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([
    { value: 14, type: "age" },
    { value: "female", type: "gender" },
    { value: "Happy", type: "mood" },
    { value: 21, type: "age" },
    { value: "male", type: "gender" },
    { value: "Sad", type: "mood" },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    { field: "value" },
    {
      headerName: "Rendered Value",
      field: "value",
      cellRendererSelector: function (params) {
        const moodDetails = {
          component: MoodRenderer,
        };
        const genderDetails = {
          component: GenderRenderer,
          params: { values: ["Male", "Female"] },
        };
        if (params.data.type === "gender") return genderDetails;
        else if (params.data.type === "mood") return moodDetails;
        else return undefined;
      },
    },
    { field: "type" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
