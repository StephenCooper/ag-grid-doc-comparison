"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Participants",
      children: [
        { field: "athlete", headerName: "Athlete Name", minWidth: 200 },
        { field: "age" },
        { field: "country", minWidth: 150 },
      ],
    },
    {
      headerName: "Olympic Games",
      children: [
        { field: "year" },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver", suppressPaste: true },
        { field: "bronze" },
        { field: "total" },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const processCellForClipboard = useCallback((params) => {
    return "C-" + params.value;
  }, []);

  const processHeaderForClipboard = useCallback((params) => {
    const colDef = params.column.getColDef();
    let headerName = colDef.headerName || colDef.field || "";
    if (colDef.headerName !== "") {
      headerName = headerName.charAt(0).toUpperCase() + headerName.slice(1);
    }
    return "H-" + headerName;
  }, []);

  const processGroupHeaderForClipboard = useCallback((params) => {
    const colGroupDef = params.columnGroup.getColGroupDef() || {};
    const headerName = colGroupDef.headerName || "";
    if (headerName === "") {
      return "";
    }
    return "GH-" + headerName;
  }, []);

  const processCellFromClipboard = useCallback((params) => {
    return "Z-" + params.value;
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          rowSelection={"multiple"}
          processCellForClipboard={processCellForClipboard}
          processHeaderForClipboard={processHeaderForClipboard}
          processGroupHeaderForClipboard={processGroupHeaderForClipboard}
          processCellFromClipboard={processCellFromClipboard}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
