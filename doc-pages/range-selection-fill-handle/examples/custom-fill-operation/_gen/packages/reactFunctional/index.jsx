"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

var daysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const createRowData = (data) => {
  var rowData = data.slice(0, 100);
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  for (var i = 0; i < 100; i++) {
    var dt = new Date(
      getRandom(currentYear - 10, currentYear + 10),
      getRandom(0, 12),
      getRandom(1, 25)
    );
    rowData[i].dayOfTheWeek = daysList[dt.getDay()];
  }
  return rowData;
};

var getRandom = function (start, finish) {
  return Math.floor(Math.random() * (finish - start) + start);
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", minWidth: 150 },
    { headerName: "Day of the Week", field: "dayOfTheWeek", minWidth: 180 },
    { field: "age", maxWidth: 90 },
    { field: "country", minWidth: 150 },
    { field: "year", maxWidth: 90 },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
    };
  }, []);
  const fillOperation = useCallback(function (params) {
    var hasNonDayValues = params.initialValues.some(function (val) {
      return daysList.indexOf(val) === -1;
    });
    if (hasNonDayValues) {
      return false;
    }
    var lastValue = params.values[params.values.length - 1];
    var idxOfLast = daysList.indexOf(lastValue);
    return daysList[(idxOfLast + 1) % daysList.length];
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(createRowData(data));
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          enableFillHandle={true}
          fillOperation={fillOperation}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
