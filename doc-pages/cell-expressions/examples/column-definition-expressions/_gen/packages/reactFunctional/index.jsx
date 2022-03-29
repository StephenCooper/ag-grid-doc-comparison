"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "String (editable)",
      field: "simple",
      editable: true,
    },
    {
      headerName: "Bad Number (editable)",
      field: "numberBad",
      editable: true,
    },
    {
      headerName: "Good Number (editable)",
      field: "numberGood",
      editable: true,
      valueFormatter: `"£" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")`,
      valueParser: "Number(newValue)",
    },
    {
      headerName: "Name (editable)",
      editable: true,
      valueGetter: 'data.firstName + " " + data.lastName',
      valueSetter:
        // an expression can span multiple lines!!!
        `var nameSplit = newValue.split(" ");
             var newFirstName = nameSplit[0];
             var newLastName = nameSplit[1];
             if (data.firstName !== newFirstName || data.lastName !== newLastName) {  
                data.firstName = newFirstName;  
                data.lastName = newLastName;  
                return true;
            } else {  
                return false;
            }`,
    },
    { headerName: "A", field: "a", maxWidth: 120 },
    { headerName: "B", field: "b", maxWidth: 120 },
    { headerName: "A + B", valueGetter: "data.a + data.b", maxWidth: 120 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onCellValueChanged = useCallback((event) => {
    console.log("data after changes is: ", event.data);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
