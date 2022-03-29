"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

var dateFilterParams = {
  filters: [
    {
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterDate, cellValue) {
          if (cellValue == null) return -1;
          return getDate(cellValue).getTime() - filterDate.getTime();
        },
      },
    },
    {
      filter: "agSetColumnFilter",
      filterParams: {
        comparator: function (a, b) {
          return getDate(a).getTime() - getDate(b).getTime();
        },
      },
    },
  ],
};

const getDate = (value) => {
  var dateParts = value.split("/");
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", filter: "agMultiColumnFilter" },
    {
      field: "gold",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agNumberColumnFilter",
          },
          {
            filter: "agSetColumnFilter",
          },
        ],
      },
    },
    {
      field: "date",
      filter: "agMultiColumnFilter",
      filterParams: dateFilterParams,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
      menuTabs: ["filterMenuTab"],
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
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
