import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CustomPinnedRowRenderer from "./customPinnedRowRendererVue.js";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <span>
                        Rows to Pin on Top:
                    </span>
                    <select v-on:change="onPinnedRowTopCount()" id="top-row-count" style="margin-left: 10px; margin-right: 20px;">
                        <option value="0">0</option>
                        <option value="1" selected="">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <span>
                        Rows to Pin on Bottom:
                    </span>
                    <select v-on:change="onPinnedRowBottomCount()" id="bottom-row-count" style="margin-left: 10px;">
                        <option value="0">0</option>
                        <option value="1" selected="">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :getRowStyle="getRowStyle"
                :pinnedTopRowData="pinnedTopRowData"
                :pinnedBottomRowData="pinnedBottomRowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    CustomPinnedRowRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: "athlete",
          cellRendererSelector: (params) => {
            if (params.node.rowPinned) {
              return {
                component: "CustomPinnedRowRenderer",
                params: {
                  style: { color: "blue" },
                },
              };
            } else {
              // rows that are not pinned don't use any cell renderer
              return undefined;
            }
          },
        },
        {
          field: "age",
          cellRendererSelector: (params) => {
            if (params.node.rowPinned) {
              return {
                component: "CustomPinnedRowRenderer",
                params: {
                  style: { "font-style": "italic" },
                },
              };
            } else {
              // rows that are not pinned don't use any cell renderer
              return undefined;
            }
          },
        },
        { field: "country" },
        { field: "year" },
        { field: "date" },
        { field: "sport" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 200,
        sortable: true,
        filter: true,
        resizable: true,
      },
      getRowStyle: null,
      pinnedTopRowData: null,
      pinnedBottomRowData: null,
      rowData: null,
    };
  },
  created() {
    this.getRowStyle = (params) => {
      if (params.node.rowPinned) {
        return { "font-weight": "bold" };
      }
    };
    this.pinnedTopRowData = createData(1, "Top");
    this.pinnedBottomRowData = createData(1, "Bottom");
  },
  methods: {
    onPinnedRowTopCount() {
      var headerRowsToFloat = document.getElementById("top-row-count").value;
      var count = Number(headerRowsToFloat);
      var rows = createData(count, "Top");
      this.gridApi.setPinnedTopRowData(rows);
    },
    onPinnedRowBottomCount() {
      var footerRowsToFloat = document.getElementById("bottom-row-count").value;
      var count = Number(footerRowsToFloat);
      var rows = createData(count, "Bottom");
      this.gridApi.setPinnedBottomRowData(rows);
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

window.createData = function createData(count, prefix) {
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push({
      athlete: prefix + " Athlete " + i,
      age: prefix + " Age " + i,
      country: prefix + " Country " + i,
      year: prefix + " Year " + i,
      date: prefix + " Date " + i,
      sport: prefix + " Sport " + i,
    });
  }
  return result;
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
