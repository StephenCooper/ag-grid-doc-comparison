import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  RowNode,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  SetFilterModule,
  RowGroupingModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "country", rowGroup: true, hide: true },
    { field: "athlete", minWidth: 180 },
    { field: "age" },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  },
  autoGroupColumnDef: {
    minWidth: 200,
  },
  groupDefaultExpanded: 1,
};

function onBtForEachNode() {
  console.log("### api.forEachNode() ###");
  gridOptions.api!.forEachNode(printNode);
}

function onBtForEachNodeAfterFilter() {
  console.log("### api.forEachNodeAfterFilter() ###");
  gridOptions.api!.forEachNodeAfterFilter(printNode);
}

function onBtForEachNodeAfterFilterAndSort() {
  console.log("### api.forEachNodeAfterFilterAndSort() ###");
  gridOptions.api!.forEachNodeAfterFilterAndSort(printNode);
}

function onBtForEachLeafNode() {
  console.log("### api.forEachLeafNode() ###");
  gridOptions.api!.forEachLeafNode(printNode);
}

const printNode = (node: RowNode, index?: number) => {
  if (node.group) {
    console.log(index + " -> group: " + node.key);
  } else {
    console.log(
      index + " -> data: " + node.data.country + ", " + node.data.athlete
    );
  }
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data.slice(0, 50)));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtForEachNode = onBtForEachNode;
  (<any>window).onBtForEachNodeAfterFilter = onBtForEachNodeAfterFilter;
  (<any>window).onBtForEachNodeAfterFilterAndSort =
    onBtForEachNodeAfterFilterAndSort;
  (<any>window).onBtForEachLeafNode = onBtForEachLeafNode;
}
