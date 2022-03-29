import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div id="wrapper">
                <div id="pieChart" class="ag-theme-alpine-dark"></div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :enableCharts="true"
                :chartThemes="chartThemes"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "salesRep", chartDataType: "category" },
        { field: "handset", chartDataType: "category" },
        { field: "sale", chartDataType: "series" },
        { field: "saleDate", chartDataType: "category" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: "agSetColumnFilter",
        floatingFilter: true,
        resizable: true,
      },
      rowData: null,
      chartThemes: null,
    };
  },
  created() {
    this.rowData = getData();
    this.chartThemes = ["ag-default-dark"];
  },
  methods: {
    onFirstDataRendered(params) {
      params.api.createCrossFilterChart({
        chartType: "pie",
        cellRange: {
          columns: ["salesRep", "sale"],
        },
        aggFunc: "sum",
        chartThemeOverrides: {
          common: {
            title: {
              enabled: true,
              text: "Sales by Representative ($)",
            },
          },
          pie: {
            series: {
              title: {
                enabled: false,
              },
              label: {
                enabled: false,
              },
            },
          },
        },
        chartContainer: document.querySelector("#pieChart"),
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount("#app");
