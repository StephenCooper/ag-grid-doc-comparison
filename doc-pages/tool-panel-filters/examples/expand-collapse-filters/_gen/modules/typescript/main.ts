import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  IFiltersToolPanel,
  SideBarDef,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  SetFilterModule,
  FiltersToolPanelModule,
]);

const columnDefs: (ColDef | ColGroupDef)[] = [
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
        children: [{ field: "year" }, { field: "date", minWidth: 180 }],
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
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  sideBar: "filters",
};

function collapseAll() {
  (
    gridOptions.api!.getToolPanelInstance("filters") as any as IFiltersToolPanel
  ).collapseFilters();
}

function expandYearAndSport() {
  (
    gridOptions.api!.getToolPanelInstance("filters") as any as IFiltersToolPanel
  ).expandFilters(["year", "sport"]);
}

function collapseYear() {
  (
    gridOptions.api!.getToolPanelInstance("filters") as any as IFiltersToolPanel
  ).collapseFilters(["year"]);
}

function expandAll() {
  (
    gridOptions.api!.getToolPanelInstance("filters") as any as IFiltersToolPanel
  ).expandFilters();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).collapseAll = collapseAll;
  (<any>window).expandYearAndSport = expandYearAndSport;
  (<any>window).collapseYear = collapseYear;
  (<any>window).expandAll = expandAll;
}
