import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  CellEditingStartedEvent,
  CellEditingStoppedEvent,
  Grid,
  GridOptions,
  ICellEditorParams,
  ModuleRegistry,
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import { MoodEditor } from "./moodEditor";
import { NumericCellEditor } from "./numericCellEditor";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
  RichSelectModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "type" },
    {
      field: "value",
      editable: true,
      cellEditorSelector: cellEditorSelector,
    },
  ],
  defaultColDef: {
    flex: 1,
  },
  rowData: getData(),

  onRowEditingStarted: onRowEditingStarted,
  onRowEditingStopped: onRowEditingStopped,
  onCellEditingStarted: onCellEditingStarted,
  onCellEditingStopped: onCellEditingStopped,
};

function onRowEditingStarted(event: RowEditingStartedEvent) {
  console.log("never called - not doing row editing");
}

function onRowEditingStopped(event: RowEditingStoppedEvent) {
  console.log("never called - not doing row editing");
}

function onCellEditingStarted(event: CellEditingStartedEvent) {
  console.log("cellEditingStarted");
}

function onCellEditingStopped(event: CellEditingStoppedEvent) {
  console.log("cellEditingStopped");
}

function cellEditorSelector(params: ICellEditorParams) {
  if (params.data.type === "age") {
    return {
      component: NumericCellEditor,
    };
  }

  if (params.data.type === "gender") {
    return {
      component: "agRichSelectCellEditor",
      params: {
        values: ["Male", "Female"],
      },
      popup: true,
    };
  }

  if (params.data.type === "mood") {
    return {
      component: MoodEditor,
      popup: true,
      popupPosition: "under",
    };
  }

  return undefined;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
