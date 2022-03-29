import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div style="margin-bottom: 4px;">
                    <button v-on:click="onUpdateSomeValues()">Update Some Data</button>
                    <button v-on:click="onFlashOneCell()" style="margin-left: 15px;">Flash One Cell</button>
                    <button v-on:click="onFlashTwoRows()">Flash Two Rows</button>
                    <button v-on:click="onFlashTwoColumns()">Flash Two Columns</button>
                </div>
                <div style="flex-grow: 1;">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "a" },
        { field: "b" },
        { field: "c" },
        { field: "d" },
        { field: "e" },
        { field: "f" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        cellClass: "align-right",
        enableCellChangeFlash: true,
        resizable: true,
        valueFormatter: function (params) {
          return formatNumber(params.value);
        },
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = createRowData();
  },
  methods: {
    onUpdateSomeValues() {
      var rowCount = this.gridApi.getDisplayedRowCount();
      // pick 20 cells at random to update
      for (var i = 0; i < 20; i++) {
        var row = Math.floor(Math.random() * rowCount);
        var rowNode = this.gridApi.getDisplayedRowAtIndex(row);
        var col = ["a", "b", "c", "d", "e", "f"][i % 6];
        rowNode.setDataValue(col, Math.floor(Math.random() * 10000));
      }
    },
    onFlashOneCell() {
      // pick fourth row at random
      var rowNode = this.gridApi.getDisplayedRowAtIndex(4);
      // pick 'c' column
      this.gridApi.flashCells({ rowNodes: [rowNode], columns: ["c"] });
    },
    onFlashTwoColumns() {
      // flash whole column, so leave row selection out
      this.gridApi.flashCells({ columns: ["c", "d"] });
    },
    onFlashTwoRows() {
      // pick fourth and fifth row at random
      var rowNode1 = this.gridApi.getDisplayedRowAtIndex(4);
      var rowNode2 = this.gridApi.getDisplayedRowAtIndex(5);
      // flash whole row, so leave column selection out
      this.gridApi.flashCells({ rowNodes: [rowNode1, rowNode2] });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.formatNumber = function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

window.createRowData = function createRowData() {
  var rowData = [];
  for (var i = 0; i < 20; i++) {
    rowData.push({
      a: Math.floor(((i + 323) * 25435) % 10000),
      b: Math.floor(((i + 323) * 23221) % 10000),
      c: Math.floor(((i + 323) * 468276) % 10000),
      d: 0,
      e: 0,
      f: 0,
    });
  }
  return rowData;
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
