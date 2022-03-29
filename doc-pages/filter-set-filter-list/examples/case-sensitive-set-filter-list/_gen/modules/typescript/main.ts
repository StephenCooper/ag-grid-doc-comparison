import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  ICellRendererParams,
  IFiltersToolPanel,
  SideBarDef,
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

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: "Case Insensitive (default)",
      field: "colour",
      filter: "agSetColumnFilter",
      filterParams: {
        caseSensitive: false,
        cellRenderer: colourCellRenderer,
      },
    },
    {
      headerName: "Case Sensitive",
      field: "colour",
      filter: "agSetColumnFilter",
      filterParams: {
        caseSensitive: true,
        cellRenderer: colourCellRenderer,
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 225,
    cellRenderer: colourCellRenderer,
    resizable: true,
    floatingFilter: true,
  },
  sideBar: "filters",
  onFirstDataRendered: onFirstDataRendered,
  rowData: getData(),
};

const FIXED_STYLES =
  "vertical-align: middle; border: 1px solid black; margin: 3px; display: inline-block; width: 10px; height: 10px";

function colourCellRenderer(params: ICellRendererParams) {
  if (!params.value || params.value === "(Select All)") {
    return params.value;
  }

  return `<div style="background-color: ${params.value.toLowerCase()}; ${FIXED_STYLES}"></div>${
    params.value
  }`;
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  (
    params.api.getToolPanelInstance("filters") as any as IFiltersToolPanel
  ).expandFilters();
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
