import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  Grid,
  GridOptions,
  ModuleRegistry,
  SideBarDef,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete", filter: "agTextColumnFilter", minWidth: 200 },
    { field: "age" },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "date", minWidth: 160 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    sortable: true,
    filter: true,
  },
  sideBar: {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
      },
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
      },
    ],
    defaultToolPanel: "filters",
    hiddenByDefault: true,
  },
};

function setSideBarVisible(value: boolean) {
  gridOptions.api!.setSideBarVisible(value);
}

function isSideBarVisible() {
  alert(gridOptions.api!.isSideBarVisible());
}

function openToolPanel(key: string) {
  gridOptions.api!.openToolPanel(key);
}

function closeToolPanel() {
  gridOptions.api!.closeToolPanel();
}

function getOpenedToolPanel() {
  alert(gridOptions.api!.getOpenedToolPanel());
}

function setSideBar(def: SideBarDef) {
  gridOptions.api!.setSideBar(def);
}

function getSideBar() {
  var sideBar = gridOptions.api!.getSideBar();
  alert(JSON.stringify(sideBar));
  console.log(sideBar);
}

function setSideBarPosition(position: "left" | "right") {
  gridOptions.api!.setSideBarPosition(position);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).setSideBarVisible = setSideBarVisible;
  (<any>window).isSideBarVisible = isSideBarVisible;
  (<any>window).openToolPanel = openToolPanel;
  (<any>window).closeToolPanel = closeToolPanel;
  (<any>window).getOpenedToolPanel = getOpenedToolPanel;
  (<any>window).setSideBar = setSideBar;
  (<any>window).getSideBar = getSideBar;
  (<any>window).setSideBarPosition = setSideBarPosition;
}
