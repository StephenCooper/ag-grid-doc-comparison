import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  IFiltersToolPanel,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  SetFilterModule,
  FiltersToolPanelModule,
]);

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: "Athlete",
    children: [
      {
        headerName: "Name",
        field: "athlete",
        minWidth: 200,
        filter: "agTextColumnFilter",
      },
      { field: "age" },
      { field: "country", minWidth: 200 },
    ],
  },
  {
    headerName: "Competition",
    children: [{ field: "year" }, { field: "date", minWidth: 180 }],
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
];

var sortedToolPanelColumnDefs = [
  {
    headerName: "Athlete",
    children: [
      { field: "age" },
      { field: "country" },
      { headerName: "Name", field: "athlete" },
    ],
  },
  {
    headerName: "Competition",
    children: [{ field: "date" }, { field: "year" }],
  },
  {
    headerName: "Medals",
    children: [
      { field: "bronze" },
      { field: "gold" },
      { field: "silver" },
      { field: "total" },
    ],
  },
  { colId: "sport", field: "sport", width: 110 },
];

var customToolPanelColumnDefs = [
  {
    headerName: "Dummy Group 1",
    children: [
      { field: "age" },
      { headerName: "Name", field: "athlete" },
      {
        headerName: "Dummy Group 2",
        children: [{ colId: "sport" }, { field: "country" }],
      },
    ],
  },
  {
    headerName: "Medals",
    children: [
      { field: "total" },
      { field: "bronze" },
      {
        headerName: "Dummy Group 3",
        children: [{ field: "silver" }, { field: "gold" }],
      },
    ],
  },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    filter: true,
  },
  columnDefs: columnDefs,
  sideBar: {
    toolPanels: [
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
        toolPanelParams: {
          suppressExpandAll: false,
          suppressFilterSearch: false,
          // prevents custom layout changing when columns are reordered in the grid
          suppressSyncLayoutWithGrid: true,
        },
      },
    ],
    defaultToolPanel: "filters",
  },
};

function setCustomSortLayout() {
  var filtersToolPanel = gridOptions.api!.getToolPanelInstance(
    "filters"
  ) as any as IFiltersToolPanel;
  filtersToolPanel!.setFilterLayout(sortedToolPanelColumnDefs);
}

function setCustomGroupLayout() {
  var filtersToolPanel = gridOptions.api!.getToolPanelInstance(
    "filters"
  ) as any as IFiltersToolPanel;
  filtersToolPanel!.setFilterLayout(customToolPanelColumnDefs);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).setCustomSortLayout = setCustomSortLayout;
  (<any>window).setCustomGroupLayout = setCustomGroupLayout;
}
