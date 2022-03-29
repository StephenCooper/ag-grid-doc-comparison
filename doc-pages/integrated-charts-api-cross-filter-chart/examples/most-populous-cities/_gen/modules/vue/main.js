import Vue from "vue";
import { AgGridVue } from "@ag-grid-community/vue";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  SetFilterModule,
  MultiFilterModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div id="wrapper">
                <div id="barChart" class="ag-theme-alpine-dark"></div>
                <div id="bubbleChart" class="ag-theme-alpine-dark"></div>
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
        { field: "city", chartDataType: "category" },
        { field: "country", chartDataType: "category" },
        { field: "longitude", chartDataType: "series" },
        { field: "latitude", chartDataType: "series" },
        { field: "population", chartDataType: "series" },
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
    };
  },
  created() {
    this.rowData = getData();
    this.chartThemes = ["ag-default-dark"];
  },
  methods: {
    onFirstDataRendered(params) {
      createColumnChart(params.api);
      createBubbleChart(params.api);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.createColumnChart = function createColumnChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: "column",
    cellRange: {
      columns: ["country", "population"],
    },
    aggFunc: "count",
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Number of Most Populous Cities by Country",
        },
        legend: {
          enabled: false,
        },
      },
      cartesian: {
        axes: {
          category: {
            label: {
              rotation: 325,
            },
          },
        },
      },
    },
    chartContainer: document.querySelector("#barChart"),
  });
};

window.createBubbleChart = function createBubbleChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: "bubble",
    cellRange: {
      columns: ["longitude", "latitude", "population"],
    },
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: "Latitude vs Longitude of Most Populous Cities",
        },
        legend: {
          enabled: false,
        },
      },
    },
    chartContainer: document.querySelector("#bubbleChart"),
  });
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
