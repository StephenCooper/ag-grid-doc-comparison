import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

("use strict");

const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const columnDefs = useMemo(() => [
    {
      headerName: "#",
      colId: "rowNum",
      valueGetter: "node.id",
    },
    {
      field: "athlete",
      minWidth: 170,
    },
    { field: "age" },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const myInput = useRef();

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  useEffect(() => {
    if (!myInput.current || !gridApi || !gridColumnApi) {
      return;
    }

    myInput.current.addEventListener(
      "keydown",
      function (event) {
        if (event.key !== "Tab") {
          return;
        }

        event.preventDefault();
        gridApi.ensureIndexVisible(0);

        const firstCol = gridColumnApi.getAllDisplayedColumns()[0];

        gridApi.ensureColumnVisible(firstCol);
        gridApi.setFocusedCell(0, firstCol);
      },
      true
    );
  }, [myInput, gridApi, gridColumnApi]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="test-container">
        <div>
          <div className="form-container">
            <label>Tab into Grid (Focus the First Cell)</label>
            <input ref={myInput} />
          </div>
          <div className="form-container">
            <label>Tab into the Grid (Default Behavior)</label>
            <input type="text" />
          </div>
        </div>
        <div
          id="myGrid"
          style={{ height: "100%", width: "100%" }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              editable: true,
              sortable: true,
              flex: 1,
              minWidth: 100,
              filter: true,
              resizable: true,
            }}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
        <div className="form-container">
          <label>Tab into the grid with Shift-Tab (Default Behavior)</label>
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
