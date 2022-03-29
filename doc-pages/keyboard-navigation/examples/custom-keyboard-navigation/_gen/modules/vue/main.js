import Vue from "vue";
import { AgGridVue } from "@ag-grid-community/vue";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :navigateToNextHeader="navigateToNextHeader"
                :tabToNextHeader="tabToNextHeader"
                :tabToNextCell="tabToNextCell"
                :navigateToNextCell="navigateToNextCell"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: "Athlete",
          children: [
            { field: "athlete", headerName: "Name", minWidth: 170 },
            { field: "age" },
            { field: "country" },
          ],
        },
        { field: "year" },
        { field: "sport" },
        {
          headerName: "Medals",
          children: [
            { field: "gold" },
            { field: "silver" },
            { field: "bronze" },
            { field: "total" },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
    navigateToNextHeader(params) {
      const nextHeader = params.nextHeaderPosition;
      if (params.key !== "ArrowDown" && params.key !== "ArrowUp") {
        return nextHeader;
      }
      const processedNextHeader = moveHeaderFocusUpDown(
        params.previousHeaderPosition,
        params.headerRowCount,
        params.key === "ArrowDown"
      );
      return processedNextHeader === nextHeader ? null : processedNextHeader;
    },
    tabToNextHeader(params) {
      return moveHeaderFocusUpDown(
        params.previousHeaderPosition,
        params.headerRowCount,
        params.backwards
      );
    },
    tabToNextCell(params) {
      const previousCell = params.previousCellPosition;
      const lastRowIndex = previousCell.rowIndex;
      let nextRowIndex = params.backwards ? lastRowIndex - 1 : lastRowIndex + 1;
      const renderedRowCount = this.gridApi.getModel().getRowCount();
      if (nextRowIndex < 0) {
        nextRowIndex = -1;
      }
      if (nextRowIndex >= renderedRowCount) {
        nextRowIndex = renderedRowCount - 1;
      }
      const result = {
        rowIndex: nextRowIndex,
        column: previousCell.column,
        rowPinned: previousCell.rowPinned,
      };
      return result;
    },
    navigateToNextCell(params) {
      const previousCell = params.previousCellPosition,
        suggestedNextCell = params.nextCellPosition;
      let nextRowIndex, renderedRowCount;
      switch (params.key) {
        case KEY_DOWN:
          // return the cell above
          nextRowIndex = previousCell.rowIndex - 1;
          if (nextRowIndex < -1) {
            return null;
          } // returning null means don't navigate
          return {
            rowIndex: nextRowIndex,
            column: previousCell.column,
            rowPinned: previousCell.rowPinned,
          };
        case KEY_UP:
          // return the cell below
          nextRowIndex = previousCell.rowIndex + 1;
          renderedRowCount = this.gridApi.getModel().getRowCount();
          if (nextRowIndex >= renderedRowCount) {
            return null;
          } // returning null means don't navigate
          return {
            rowIndex: nextRowIndex,
            column: previousCell.column,
            rowPinned: previousCell.rowPinned,
          };
        case KEY_LEFT:
        case KEY_RIGHT:
          return suggestedNextCell;
        default:
          throw Error(
            "this will never happen, navigation is always one of the 4 keys above"
          );
      }
    },
  },
};

window.moveHeaderFocusUpDown = function moveHeaderFocusUpDown(
  previousHeader,
  headerRowCount,
  isUp
) {
  const previousColumn = previousHeader.column;
  const lastRowIndex = previousHeader.headerRowIndex;
  let nextRowIndex = isUp ? lastRowIndex - 1 : lastRowIndex + 1;
  let nextColumn;
  if (nextRowIndex === -1) {
    return previousHeader;
  }
  if (nextRowIndex === headerRowCount) {
    nextRowIndex = -1;
  }
  const parentColumn = previousColumn.getParent();
  if (isUp) {
    nextColumn = parentColumn || previousColumn;
  } else {
    nextColumn = previousColumn.children
      ? previousColumn.children[0]
      : previousColumn;
  }
  return {
    headerRowIndex: nextRowIndex,
    column: nextColumn,
  };
};

// define some handy keycode constants
const KEY_LEFT = "ArrowLeft";

const KEY_UP = "ArrowUp";

const KEY_RIGHT = "ArrowRight";

const KEY_DOWN = "ArrowDown";

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
