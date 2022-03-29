"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useState } from "react";
import { render } from "react-dom";
import SimpleCellRenderer from "./simpleCellRenderer.jsx";

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    // this column shows just the country group values, but has not group renderer, so there is no expand / collapse functionality
    {
      headerName: "Country Group - No Renderer",
      showRowGroup: "country",
      minWidth: 250,
    },
    // same as before, but we show all group values, again with no cell renderer
    {
      headerName: "All Groups - No Renderer",
      showRowGroup: true,
      minWidth: 240,
    },
    // add in a cell renderer
    {
      headerName: "Group Renderer A",
      showRowGroup: true,
      cellRenderer: "agGroupCellRenderer",
      minWidth: 220,
    },
    // add in a field
    {
      headerName: "Group Renderer B",
      field: "city",
      showRowGroup: true,
      cellRenderer: "agGroupCellRenderer",
      minWidth: 220,
    },
    // add in a cell renderer params
    {
      headerName: "Group Renderer C",
      field: "city",
      minWidth: 240,
      showRowGroup: true,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        suppressCount: true,
        checkbox: true,
        innerRenderer: SimpleCellRenderer,
        suppressDoubleClickExpand: true,
        suppressEnterExpand: true,
      },
    },
    { headerName: "Type", field: "type", rowGroup: true },
    { headerName: "Country", field: "country", rowGroup: true },
    { headerName: "City", field: "city" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 120,
      resizable: true,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          groupDisplayType={"custom"}
          suppressRowClickSelection={true}
          groupDefaultExpanded={1}
          rowSelection={"multiple"}
          groupSelectsChildren={true}
          animateRows={true}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
