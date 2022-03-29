import { Grid, GridOptions, IColumnToolPanel } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const gridOptions: GridOptions = {
  columnDefs: [
    { headerName: "Name", field: "athlete", minWidth: 200 },
    { field: "age", enableRowGroup: true },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "date", suppressColumnsToolPanel: true, minWidth: 180 },
    { field: "sport", minWidth: 200 },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
    { field: "total", aggFunc: "sum" },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    sortable: true,
    enablePivot: true,
  },
  sideBar: {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
        },
      },
    ],
    defaultToolPanel: "columns",
  },
};

function showPivotModeSection() {
  var columnToolPanel = gridOptions.api!.getToolPanelInstance(
    "columns"
  ) as unknown as IColumnToolPanel;
  columnToolPanel.setPivotModeSectionVisible(true);
}

function showRowGroupsSection() {
  var columnToolPanel = gridOptions.api!.getToolPanelInstance(
    "columns"
  ) as unknown as IColumnToolPanel;
  columnToolPanel.setRowGroupsSectionVisible(true);
}

function showValuesSection() {
  var columnToolPanel = gridOptions.api!.getToolPanelInstance(
    "columns"
  ) as unknown as IColumnToolPanel;
  columnToolPanel.setValuesSectionVisible(true);
}

function showPivotSection() {
  var columnToolPanel = gridOptions.api!.getToolPanelInstance(
    "columns"
  ) as unknown as IColumnToolPanel;
  columnToolPanel.setPivotSectionVisible(true);
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).showPivotModeSection = showPivotModeSection;
  (<any>window).showRowGroupsSection = showRowGroupsSection;
  (<any>window).showValuesSection = showValuesSection;
  (<any>window).showPivotSection = showPivotSection;
}
