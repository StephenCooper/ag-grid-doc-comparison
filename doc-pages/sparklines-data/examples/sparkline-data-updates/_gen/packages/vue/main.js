import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div style="margin-bottom: 4px;">
                    <button v-on:click="start()">► Start</button>
                    <button v-on:click="stop()">■ Stop</button>
                </div>
                <div style="flex-grow: 1;">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :rowHeight="rowHeight"></ag-grid-vue>
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
        { field: "symbol", maxWidth: 120 },
        { field: "name", minWidth: 250 },
        { field: "change", cellRenderer: "agSparklineCellRenderer" },
        { field: "volume", type: "numericColumn", maxWidth: 140 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowData: null,
      rowHeight: null,
    };
  },
  created() {
    this.rowData = getData();
    this.rowHeight = 50;
  },
  methods: {
    start() {
      if (intervalId) {
        return;
      }
      const updateData = () => {
        const itemsToUpdate = [];
        this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode) {
          const data = rowNode.data;
          const n = data.change.length;
          const v =
            Math.random() > 0.5
              ? Number(Math.random())
              : -Number(Math.random());
          data.change = [...data.change.slice(1, n), v];
          itemsToUpdate.push(data);
        });
        this.gridApi.applyTransaction({ update: itemsToUpdate });
      };
      intervalId = setInterval(updateData, 300);
    },
    stop() {
      if (intervalId === undefined) {
        return;
      }
      clearInterval(intervalId);
      intervalId = undefined;
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

var intervalId;

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
