"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CustomTooltip from "./customTooltip.jsx";

const tooltipValueGetter = (params) => ({ value: params.value });

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Athletes",
      headerTooltip: "Athletes",
      tooltipComponent: CustomTooltip,
      children: [
        {
          headerName: "Athlete Col 1",
          field: "athlete",
          minWidth: 150,
          headerTooltip: "Athlete 1",
          tooltipField: "athlete",
        },
        {
          headerName: "Athlete Col 2",
          field: "athlete",
          minWidth: 150,
          headerTooltip: "Athlete 2",
          tooltipComponent: CustomTooltip,
          tooltipValueGetter: tooltipValueGetter,
        },
      ],
    },
    { field: "sport", width: 110 },
    { field: "gold", width: 100 },
    { field: "silver", width: 100 },
    { field: "bronze", width: 100 },
    { field: "total", width: 100 },
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
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.getDisplayedRowAtIndex(0).data.athlete = undefined;
    gridRef.current.api.getDisplayedRowAtIndex(1).data.athlete = null;
    gridRef.current.api.getDisplayedRowAtIndex(2).data.athlete = "";
    gridRef.current.api.refreshCells();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
