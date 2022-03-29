import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
  RowNode,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

var dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight: Date, cellValue: string) {
    var cellDate = asDate(cellValue);

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
};

const columnDefs: ColDef[] = [
  { field: "athlete", minWidth: 180 },
  { field: "age", filter: "agNumberColumnFilter", maxWidth: 80 },
  { field: "country" },
  { field: "year", maxWidth: 90 },
  {
    field: "date",
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
  },
  { field: "gold", filter: "agNumberColumnFilter" },
  { field: "silver", filter: "agNumberColumnFilter" },
  { field: "bronze", filter: "agNumberColumnFilter" },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 120,
    filter: true,
  },
  animateRows: true,
  isExternalFilterPresent: isExternalFilterPresent,
  doesExternalFilterPass: doesExternalFilterPass,
};

var ageType = "everyone";

function isExternalFilterPresent() {
  // if ageType is not everyone, then we are filtering
  return ageType !== "everyone";
}

function doesExternalFilterPass(node: RowNode) {
  switch (ageType) {
    case "below25":
      return node.data.age < 25;
    case "between25and50":
      return node.data.age >= 25 && node.data.age <= 50;
    case "above50":
      return node.data.age > 50;
    case "dateAfter2008":
      return asDate(node.data.date) > new Date(2008, 1, 1);
    default:
      return true;
  }
}

function asDate(dateAsString: string) {
  var splitFields = dateAsString.split("/");
  return new Date(
    Number.parseInt(splitFields[2]),
    Number.parseInt(splitFields[1]) - 1,
    Number.parseInt(splitFields[0])
  );
}

function externalFilterChanged(newValue: string) {
  ageType = newValue;
  gridOptions.api!.onFilterChanged();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then(function (data) {
    (document.querySelector("#everyone") as HTMLInputElement).checked = true;
    gridOptions.api!.setRowData(data);
  });

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).externalFilterChanged = externalFilterChanged;
}
