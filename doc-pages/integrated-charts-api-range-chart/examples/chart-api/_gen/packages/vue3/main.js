import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="outer-div">
                <div class="button-bar">
                    <button v-on:click="onChart1()">Top 5 Medal Winners</button>
                    <button v-on:click="onChart2()">Bronze Medals by Country</button>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :enableRangeSelection="true"
                :enableCharts="true"
                :popupParent="popupParent"></ag-grid-vue>
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
        { field: "country", width: 150, chartDataType: "category" },
        { field: "gold", chartDataType: "series", sort: "desc" },
        { field: "silver", chartDataType: "series", sort: "desc" },
        { field: "bronze", chartDataType: "series" },
        {
          headerName: "A",
          valueGetter: "Math.floor(Math.random()*1000)",
          chartDataType: "series",
        },
        {
          headerName: "B",
          valueGetter: "Math.floor(Math.random()*1000)",
          chartDataType: "series",
        },
        {
          headerName: "C",
          valueGetter: "Math.floor(Math.random()*1000)",
          chartDataType: "series",
        },
        {
          headerName: "D",
          valueGetter: "Math.floor(Math.random()*1000)",
          chartDataType: "series",
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      rowData: null,
      popupParent: null,
    };
  },
  created() {
    this.rowData = getData();
    this.popupParent = document.body;
  },
  methods: {
    onChart1() {
      var params = {
        cellRange: {
          rowStartIndex: 0,
          rowEndIndex: 4,
          columns: ["country", "gold", "silver"],
        },
        chartType: "groupedColumn",
        chartThemeName: "ag-vivid",
        chartThemeOverrides: {
          common: {
            title: {
              enabled: true,
              text: "Top 5 Medal Winners",
            },
          },
        },
      };
      this.gridApi.createRangeChart(params);
    },
    onChart2() {
      var params = {
        cellRange: {
          columns: ["country", "bronze"],
        },
        chartType: "groupedBar",
        chartThemeName: "ag-pastel",
        chartThemeOverrides: {
          common: {
            title: {
              enabled: true,
              text: "Bronze Medal by Country",
            },
            legend: {
              enabled: false,
            },
          },
        },
        unlinkChart: true,
      };
      this.gridApi.createRangeChart(params);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount("#app");
