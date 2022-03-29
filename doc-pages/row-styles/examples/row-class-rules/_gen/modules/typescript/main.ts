import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  RowClassRules,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridOptions: GridOptions = {
  rowData: getData(),
  columnDefs: [
    { headerName: "Employee", field: "employee" },
    { headerName: "Number Sick Days", field: "sickDays", editable: true },
  ],
  rowClassRules: {
    // row style function
    "sick-days-warning": function (params) {
      var numSickDays = params.data.sickDays;
      return numSickDays > 5 && numSickDays <= 7;
    },
    // row style expression
    "sick-days-breach": "data.sickDays >= 8",
  },
};

function setDataValue() {
  gridOptions.api!.forEachNode(function (rowNode) {
    rowNode.setDataValue("sickDays", randomInt());
  });
}

function setData() {
  gridOptions.api!.forEachNode(function (rowNode) {
    var newData = {
      employee: rowNode.data.employee,
      sickDays: randomInt(),
    };
    rowNode.setData(newData);
  });
}

function applyTransaction() {
  var itemsToUpdate: any[] = [];
  gridOptions.api!.forEachNode(function (rowNode) {
    var data = rowNode.data;
    data.sickDays = randomInt();
    itemsToUpdate.push(data);
  });
  gridOptions.api!.applyTransaction({ update: itemsToUpdate });
}

function randomInt() {
  return Math.floor(Math.random() * 10);
}

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
var eGridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(eGridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).setDataValue = setDataValue;
  (<any>window).setData = setData;
  (<any>window).applyTransaction = applyTransaction;
}
