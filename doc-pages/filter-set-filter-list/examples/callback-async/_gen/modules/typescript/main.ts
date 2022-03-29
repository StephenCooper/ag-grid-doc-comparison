import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  SetFilterValuesFuncParams,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

var filterParams = {
  values: function (params: SetFilterValuesFuncParams) {
    setTimeout(function () {
      params.success(["value 1", "value 2"]);
    }, 3000);
  },
};

const gridOptions: GridOptions = {
  rowData: [
    { value: "value 1" },
    { value: "value 1" },
    { value: "value 1" },
    { value: "value 1" },
    { value: "value 2" },
    { value: "value 2" },
    { value: "value 2" },
    { value: "value 2" },
    { value: "value 2" },
  ],
  columnDefs: [
    {
      headerName: "Set filter column",
      field: "value",
      flex: 1,
      filter: "agSetColumnFilter",
      floatingFilter: true,
      filterParams: filterParams,
    },
  ],
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
