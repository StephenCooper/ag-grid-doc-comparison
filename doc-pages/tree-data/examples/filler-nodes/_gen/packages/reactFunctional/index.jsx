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
  const [rowData, setRowData] = useState([
    { orgHierarchy: ["A"] },
    { orgHierarchy: ["A", "B"] },
    { orgHierarchy: ["C", "D"] },
    { orgHierarchy: ["E", "F", "G", "H"] },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    // we're using the auto group column by default!
    {
      field: "groupType",
      valueGetter: function (params) {
        return params.data ? "Provided" : "Filler";
      },
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Organisation Hierarchy",
      cellRendererParams: {
        suppressCount: true,
      },
    };
  }, []);
  const getDataPath = useCallback(function (data) {
    return data.orgHierarchy;
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          treeData={true}
          animateRows={true}
          groupDefaultExpanded={-1}
          getDataPath={getDataPath}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
