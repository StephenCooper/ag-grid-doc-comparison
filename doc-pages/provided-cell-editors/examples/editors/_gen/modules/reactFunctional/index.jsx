"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import React, { useMemo, useState } from "react";
import { render } from "react-dom";
import ColourCellRenderer from "./colourCellRenderer.jsx";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RichSelectModule]);

const colors = ["Red", "Green", "Blue"];

const data = Array.from(Array(20).keys()).map((val, index) => ({
  color1: colors[index % 3],
  color2: colors[index % 3],
  color3: colors[index % 3],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}));

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(data);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Text Editor",
      field: "color1",
      cellRenderer: ColourCellRenderer,
      cellEditor: "agTextCellEditor",
    },
    {
      headerName: "Select Editor",
      field: "color2",
      cellRenderer: ColourCellRenderer,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: colors,
      },
    },
    {
      headerName: "Rich Select Editor",
      field: "color3",
      cellRenderer: ColourCellRenderer,
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: colors,
        cellRenderer: ColourCellRenderer,
      },
    },
    {
      headerName: "Large Text Editor",
      field: "description",
      cellEditorPopup: true,
      cellEditor: "agLargeTextCellEditor",
      flex: 2,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      editable: true,
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
