import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
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
                :tooltipShowDelay="tooltipShowDelay"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", headerTooltip: "The athlete's name" },
        { field: "age", headerTooltip: "The athlete`s age" },
        { field: "country" },
        { field: "year" },
        { field: "date", headerTooltip: "The date of the Olympics" },
        { field: "sport", headerTooltip: "The sport the medal was for" },
        { field: "gold", headerTooltip: "How many gold medals" },
        { field: "silver", headerTooltip: "How many silver medals" },
        { field: "bronze", headerTooltip: "How many bronze medals" },
        { field: "total", headerTooltip: "The total number of medals" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 150,
      },
      tooltipShowDelay: null,
      rowData: null,
    };
  },
  created() {
    this.tooltipShowDelay = 500;
  },
  methods: {
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

createApp(VueExample).mount("#app");
