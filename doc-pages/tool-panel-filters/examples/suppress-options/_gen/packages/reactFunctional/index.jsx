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
      groupId: "athleteGroupId",
      headerName: "Athlete",
      children: [
        {
          headerName: "Name",
          field: "athlete",
          minWidth: 200,
          filter: "agTextColumnFilter",
        },
        { field: "age" },
        {
          groupId: "competitionGroupId",
          headerName: "Competition",
          children: [
            { field: "year" },
            { field: "date", minWidth: 180, suppressFiltersToolPanel: true },
          ],
        },
        { field: "country", minWidth: 200 },
      ],
    },
    { colId: "sport", field: "sport", minWidth: 200 },
    {
      headerName: "Medals",
      children: [
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      filter: true,
      sortable: true,
      resizable: true,
    };
  }, []);
  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
          toolPanelParams: {
            suppressExpandAll: true,
            suppressFilterSearch: true,
          },
        },
      ],
      defaultToolPanel: "filters",
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
          sideBar={sideBar}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
