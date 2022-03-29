import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

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
              line: { stroke: "rgb(52, 168, 83)" },
              highlightStyle: {
                size: 4,
                stroke: "rgb(52, 168, 83)",
                fill: "rgb(52, 168, 83)",
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
              line: { stroke: "rgb(168,52,137)" },
              highlightStyle: {
                size: 4,
                stroke: "rgb(168,52,137)",
                fill: "rgb(168,52,137)",
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

createApp(VueExample).mount("#app");
