"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import GenderCellRenderer from "./genderCellRenderer.jsx";

const cellCellEditorParams = (params) => {
  const selectedCountry = params.data.country;
  const allowedCities = countyToCityMap(selectedCountry);
  return {
    values: allowedCities,
    formatValue: (value) => `${value} (${selectedCountry})`,
  };
};

const countyToCityMap = (match) => {
  const map = {
    Ireland: ["Dublin", "Cork", "Galway"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston"],
  };
  return map[match];
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: "name" },
    {
      field: "gender",
      cellRenderer: GenderCellRenderer,
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: ["Male", "Female"],
        cellRenderer: GenderCellRenderer,
        cellEditorPopup: true,
      },
    },
    {
      field: "country",
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        cellHeight: 50,
        values: ["Ireland", "USA"],
      },
    },
    {
      field: "city",
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: cellCellEditorParams,
    },
    {
      field: "address",
      cellEditor: "agLargeTextCellEditor",
      cellEditorPopup: true,
      minWidth: 550,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 130,
      editable: true,
      resizable: true,
    };
  }, []);

  const onCellValueChanged = useCallback((params) => {
    const colId = params.column.getId();
    if (colId === "country") {
      const selectedCountry = params.data.country;
      const selectedCity = params.data.city;
      const allowedCities = countyToCityMap(selectedCountry);
      const cityMismatch = allowedCities.indexOf(selectedCity) < 0;
      if (cityMismatch) {
        params.node.setDataValue("city", null);
      }
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
