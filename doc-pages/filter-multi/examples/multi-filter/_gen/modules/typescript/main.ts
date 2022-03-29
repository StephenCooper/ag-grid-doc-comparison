import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  SideBarDef,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MultiFilterModule,
  SetFilterModule,
  MenuModule,
  ClipboardModule,
  FiltersToolPanelModule,
]);

var dateFilterParams = {
  filters: [
    {
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterDate: Date, cellValue: string) {
          if (cellValue == null) return -1;

          return getDate(cellValue).getTime() - filterDate.getTime();
        },
      },
    },
    {
      filter: "agSetColumnFilter",
      filterParams: {
        comparator: function (a: string, b: string) {
          return getDate(a).getTime() - getDate(b).getTime();
        },
      },
    },
  ],
};

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete", filter: "agMultiColumnFilter" },
    {
      field: "country",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agTextColumnFilter",
            filterParams: {
              defaultOption: "startsWith",
            },
          },
          {
            filter: "agSetColumnFilter",
          },
        ],
      },
    },
    {
      field: "gold",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agNumberColumnFilter",
          },
          {
            filter: "agSetColumnFilter",
          },
        ],
      },
    },
    {
      field: "date",
      filter: "agMultiColumnFilter",
      filterParams: dateFilterParams,
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
    menuTabs: ["filterMenuTab"],
  },
  sideBar: {
    toolPanels: ["filters"],
  },
};

function getDate(value: string): Date {
  var dateParts = value.split("/");
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
