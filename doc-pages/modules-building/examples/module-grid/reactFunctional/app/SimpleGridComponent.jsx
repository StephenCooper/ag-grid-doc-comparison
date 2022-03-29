import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";
import React, { useState } from "react";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
]);

const App = () => {
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
  ]);

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={(params) => params.api.sizeColumnsToFit()}
      ></AgGridReact>
    </div>
  );
};

export default App;
