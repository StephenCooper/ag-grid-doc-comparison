import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow: hidden;">
                <ag-grid-vue
                
                style="width: 100%; height: 40%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :pivotMode="true"
                :popupParent="popupParent"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
                <div id="chart" style="flex: 1 1 auto; overflow: hidden; height: 60%;"></div>
            </div>
                
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "country", pivot: true },
        { field: "year", rowGroup: true },
        { field: "sport", rowGroup: true },
        { field: "total", aggFunc: "sum" },
        { field: "gold", aggFunc: "sum" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 130,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      popupParent: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 200,
    };
    this.popupParent = document.body;
  },
  methods: {
    onFirstDataRendered(event) {
      var chartContainer = document.querySelector("#chart");
      var params = {
        chartType: "groupedColumn",
        chartContainer: chartContainer,
        chartThemeName: "ag-vivid",
        chartThemeOverrides: {
          common: {
            padding: {
              top: 20,
              left: 10,
              bottom: 30,
              right: 10,
            },
            legend: {
              enabled: true,
              position: "bottom",
            },
            navigator: {
              enabled: true,
              height: 10,
            },
          },
        },
      };
      event.api.createPivotChart(params);
      // expand one row for demonstration purposes
      setTimeout(function () {
        event.api.getDisplayedRowAtIndex(2).setExpanded(true);
      }, 0);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

      fetch("https://www.ag-grid.com/example-assets/wide-spread-of-sports.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount("#app");
