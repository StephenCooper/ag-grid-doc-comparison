import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  RowGroupingDisplayType,
  ValueGetterParams,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  SetFilterModule,
]);

const columnDefs: ColDef[] = [
  {
    headerName: "Country",
    colId: "countryGroup",
    showRowGroup: "country",
    minWidth: 200,
    cellRenderer: "agGroupCellRenderer",
    filterValueGetter: function (params: ValueGetterParams) {
      return params.data ? params.data.country : null;
    },
  },
  { field: "country", rowGroup: true, hide: true },
  {
    headerName: "Year / Athlete",
    colId: "yearAthleteGroup",
    minWidth: 220,
    showRowGroup: "year",
    cellRenderer: "agGroupCellRenderer",
    valueGetter: "data ? data.athlete : null",
  },
  { field: "year", rowGroup: true, hide: true },
  { field: "sport", minWidth: 200 },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
  { field: "age" },
  { field: "date", minWidth: 140 },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
  },
  groupDisplayType: "custom",
  enableRangeSelection: true,
  animateRows: true,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
