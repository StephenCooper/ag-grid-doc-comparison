import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <button v-on:click="onAddRange()">Add Range</button>
                    <button v-on:click="onClearRange()">Clear Range</button>
                    Range Count:
                    <span id="lbRangeCount" style="padding-right: 20px;"></span>
                    Eager Sum:
                    <span id="lbEagerSum" style="padding-right: 20px;"></span>
                    Lazy Sum:
                    <span id="lbLazySum" style="padding-right: 20px;"></span>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :enableRangeSelection="true"
                :processCellForClipboard="processCellForClipboard"
                :processCellFromClipboard="processCellFromClipboard"
                :rowData="rowData"
                @range-selection-changed="onRangeSelectionChanged"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", minWidth: 150 },
        { field: "age", maxWidth: 90 },
        { field: "country", minWidth: 150 },
        { field: "year", maxWidth: 90 },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        editable: true,
      },
      processCellForClipboard: null,
      processCellFromClipboard: null,
      rowData: null,
    };
  },
  created() {
    this.processCellForClipboard = (params) => {
      if (
        params.column.getColId() === "athlete" &&
        params.value &&
        params.value.toUpperCase
      ) {
        return params.value.toUpperCase();
      }
      return params.value;
    };
    this.processCellFromClipboard = (params) => {
      if (
        params.column.getColId() === "athlete" &&
        params.value &&
        params.value.toLowerCase
      ) {
        return params.value.toLowerCase();
      }
      return params.value;
    };
  },
  methods: {
    onRangeSelectionChanged(event) {
      var lbRangeCount = document.querySelector("#lbRangeCount");
      var lbEagerSum = document.querySelector("#lbEagerSum");
      var lbLazySum = document.querySelector("#lbLazySum");
      var cellRanges = this.gridApi.getCellRanges();
      // if no selection, clear all the results and do nothing more
      if (!cellRanges || cellRanges.length === 0) {
        lbRangeCount.innerHTML = "0";
        lbEagerSum.innerHTML = "-";
        lbLazySum.innerHTML = "-";
        return;
      }
      // set range count to the number of ranges selected
      lbRangeCount.innerHTML = cellRanges.length + "";
      var sum = 0;
      var api = this.gridApi;
      if (cellRanges) {
        cellRanges.forEach(function (range) {
          // get starting and ending row, remember rowEnd could be before rowStart
          var startRow = Math.min(
            range.startRow.rowIndex,
            range.endRow.rowIndex
          );
          var endRow = Math.max(range.startRow.rowIndex, range.endRow.rowIndex);
          for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
            range.columns.forEach(function (column) {
              var rowModel = api.getModel();
              var rowNode = rowModel.getRow(rowIndex);
              var value = api.getValue(column, rowNode);
              if (typeof value === "number") {
                sum += value;
              }
            });
          }
        });
      }
      lbEagerSum.innerHTML = sum + "";
      if (event.started) {
        lbLazySum.innerHTML = "?";
      }
      if (event.finished) {
        lbLazySum.innerHTML = sum + "";
      }
    },
    onAddRange() {
      this.gridApi.addCellRange({
        rowStartIndex: 4,
        rowEndIndex: 8,
        columnStart: "age",
        columnEnd: "date",
      });
    },
    onClearRange() {
      this.gridApi.clearRangeSelection();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
