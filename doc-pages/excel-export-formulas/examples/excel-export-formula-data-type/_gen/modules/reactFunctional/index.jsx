"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  MenuModule,
]);

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([
    { firstName: "Mair", lastName: "Inworth", age: 23, company: "Rhyzio" },
    { firstName: "Clair", lastName: "Cockland", age: 38, company: "Vitz" },
    { firstName: "Sonni", lastName: "Jellings", age: 24, company: "Kimia" },
    { firstName: "Kit", lastName: "Clarage", age: 27, company: "Skynoodle" },
    { firstName: "Tod", lastName: "de Mendoza", age: 29, company: "Teklist" },
    { firstName: "Herold", lastName: "Pelman", age: 23, company: "Divavu" },
    { firstName: "Paula", lastName: "Gleave", age: 37, company: "Demimbu" },
    {
      firstName: "Kendrick",
      lastName: "Clayill",
      age: 26,
      company: "Brainlounge",
    },
    {
      firstName: "Korrie",
      lastName: "Blowing",
      age: 32,
      company: "Twitternation",
    },
    { firstName: "Ferrell", lastName: "Towhey", age: 40, company: "Nlounge" },
    { firstName: "Anders", lastName: "Negri", age: 30, company: "Flipstorm" },
    { firstName: "Douglas", lastName: "Dalmon", age: 25, company: "Feedbug" },
    { firstName: "Roxanna", lastName: "Schukraft", age: 26, company: "Skinte" },
    { firstName: "Seumas", lastName: "Pouck", age: 34, company: "Aimbu" },
    { firstName: "Launce", lastName: "Welldrake", age: 25, company: "Twinte" },
    { firstName: "Siegfried", lastName: "Grady", age: 34, company: "Vimbo" },
    { firstName: "Vinson", lastName: "Hyams", age: 20, company: "Tanoodle" },
    { firstName: "Cayla", lastName: "Duckerin", age: 21, company: "Livepath" },
    { firstName: "Luigi", lastName: "Rive", age: 25, company: "Quatz" },
    { firstName: "Carolyn", lastName: "Blouet", age: 29, company: "Eamia" },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    { field: "firstName" },
    { field: "lastName" },
    {
      headerName: "Full Name",
      colId: "fullName",
      cellClass: "fullName",
      valueGetter: function (params) {
        return `${params.data.firstName} ${params.data.lastName}`;
      },
    },
    { field: "age" },
    { field: "company" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);
  const defaultExcelExportParams = useMemo(() => {
    return {
      processCellCallback: (params) => {
        const rowIndex = params.accumulatedRowIndex;
        const valueGetter = params.column.getColDef().valueGetter;
        return !!valueGetter
          ? `=CONCATENATE(A${rowIndex}, " ", B${rowIndex})`
          : params.value;
      },
    };
  }, []);
  const excelStyles = useMemo(() => {
    return [
      {
        id: "fullName",
        dataType: "Formula",
      },
    ];
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div>
          <button
            onClick={onBtExport}
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Export to Excel
          </button>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              defaultExcelExportParams={defaultExcelExportParams}
              excelStyles={excelStyles}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
