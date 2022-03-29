import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue";
import { SparklinesModule } from "@ag-grid-enterprise/sparklines";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :rowHeight="rowHeight"></ag-grid-vue>
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
        {
          field: "change",
          cellRenderer: "agSparklineCellRenderer",
          cellRendererParams: {
            sparklineOptions: {
              type: "area",
              fill: "rgba(185,173,77,0.3)",
              line: { stroke: "rgb(185,173,77)" },
              highlightStyle: {
                size: 4,
                stroke: "rgb(185,173,77)",
                fill: "rgb(185,173,77)",
              },
              tooltip: { renderer: renderer },
              crosshairs: {
                xLine: {
                  enabled: true,
                  lineDash: "dash",
                  stroke: "rgba(0, 0, 0, 0.5)",
                },
                yLine: {
                  enabled: true,
                  lineDash: "dash",
                  stroke: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          },
        },
        {
          field: "rateOfChange",
          cellRenderer: "agSparklineCellRenderer",
          cellRendererParams: {
            sparklineOptions: {
              type: "area",
              fill: "rgba(77,89,185, 0.3)",
              line: { stroke: "rgb(77,89,185)" },
              highlightStyle: {
                size: 4,
                stroke: "rgb(77,89,185)",
                fill: "rgb(77,89,185)",
              },
              tooltip: { renderer: renderer },
              crosshairs: { xLine: { enabled: false } },
            },
          },
        },
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
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.renderer = function renderer(params) {
  return {
    backgroundColor: "black",
    opacity: 0.5,
    color: "white",
  };
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
