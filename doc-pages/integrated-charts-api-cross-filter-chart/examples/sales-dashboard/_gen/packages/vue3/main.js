import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div id="wrapper">
                <div id="top">
                    <div id="columnChart" class="ag-theme-alpine-dark"></div>
                    <div id="pieChart" class="ag-theme-alpine-dark"></div>
                </div>
                <div id="barChart" class="ag-theme-alpine-dark"></div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :enableCharts="true"
                :chartThemes="chartThemes"
                :chartThemeOverrides="chartThemeOverrides"
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
        {
          headerName: "Sale Price",
          field: "sale",
          maxWidth: 160,
          aggFunc: "sum",
          filter: "agNumberColumnFilter",
          chartDataType: "series",
        },
        { field: "saleDate", chartDataType: "category" },
        {
          field: "quarter",
          maxWidth: 160,
          filter: "agSetColumnFilter",
          chartDataType: "category",
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        editable: true,
        sortable: true,
        filter: "agMultiColumnFilter",
        floatingFilter: true,
        resizable: true,
      },
      rowData: null,
      chartThemes: null,
      chartThemeOverrides: null,
    };
  },
  created() {
    this.rowData = getData();
    this.chartThemes = ["ag-default-dark"];
    this.chartThemeOverrides = {
      common: {
        padding: {
          top: 20,
          right: 40,
          bottom: 20,
          left: 30,
        },
      },
      cartesian: {
        axes: {
          category: {
            label: {
              rotation: 0,
            },
          },
        },
      },
    };
  },
  methods: {
    onFirstDataRendered(params) {
      createQuarterlySalesChart(params.api);
      createSalesByRefChart(params.api);
      createHandsetSalesChart(params.api);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.createQuarterlySalesChart = function createQuarterlySalesChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: "column",
    cellRange: {
      columns: ["quarter", "sale"],
    },
    aggFunc: "sum",
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Quarterly Sales ($)",
        },
        legend: {
          enabled: false,
        },
        axes: {
          category: {
            label: {
              rotation: 0,
            },
          },
          number: {
            label: {
              formatter: function (params) {
                return params.value / 1000 + "k";
              },
            },
          },
        },
      },
    },
    chartContainer: document.querySelector("#columnChart"),
  });
};

window.createSalesByRefChart = function createSalesByRefChart(gridApi) {
  gridApi.createCrossFilterChart({
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
};

window.createHandsetSalesChart = function createHandsetSalesChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: "bar",
    cellRange: {
      columns: ["handset", "sale"],
    },
    aggFunc: "count",
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Handsets Sold (Units)",
        },
        legend: {
          enabled: false,
        },
      },
    },
    chartContainer: document.querySelector("#barChart"),
  });
};

createApp(VueExample).mount("#app");
