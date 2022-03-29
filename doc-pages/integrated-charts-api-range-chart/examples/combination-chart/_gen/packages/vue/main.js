import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="wrapper">
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :enableRangeSelection="true"
                :chartThemes="chartThemes"
                :enableCharts="true"
                :popupParent="popupParent"
                :chartThemeOverrides="chartThemeOverrides"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
                <div id="myChart" class="ag-theme-alpine"></div>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "day", maxWidth: 90 },
        { field: "month", chartDataType: "category" },
        { field: "rain", chartDataType: "series", valueParser: numberParser },
        {
          field: "pressure",
          chartDataType: "series",
          valueParser: numberParser,
        },
        { field: "temp", chartDataType: "series", valueParser: numberParser },
        { field: "wind", chartDataType: "series", valueParser: numberParser },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        editable: true,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowData: null,
      chartThemes: null,
      popupParent: null,
      chartThemeOverrides: null,
    };
  },
  created() {
    this.rowData = getData();
    this.chartThemes = ["ag-pastel", "ag-vivid"];
    this.popupParent = document.body;
    this.chartThemeOverrides = {
      common: {
        padding: {
          right: 40,
        },
        legend: {
          position: "bottom",
        },
      },
      column: {
        series: {
          strokeWidth: 2,
          fillOpacity: 0.8,
        },
      },
      line: {
        series: {
          strokeWidth: 5,
          strokeOpacity: 0.8,
        },
      },
    };
  },
  methods: {
    onFirstDataRendered(params) {
      params.api.createRangeChart({
        chartType: "customCombo",
        cellRange: {
          columns: ["month", "rain", "pressure", "temp"],
        },
        seriesChartTypes: [
          { colId: "rain", chartType: "groupedColumn", secondaryAxis: false },
          { colId: "pressure", chartType: "line", secondaryAxis: true },
          { colId: "temp", chartType: "line", secondaryAxis: true },
        ],
        aggFunc: "sum",
        suppressChartRanges: true,
        chartContainer: document.querySelector("#myChart"),
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.numberParser = function numberParser(params) {
  const value = params.newValue;
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return parseFloat(value);
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
