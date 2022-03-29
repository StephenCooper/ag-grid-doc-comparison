import { createApp } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { GridChartsModule } from "@ag-grid-enterprise/charts";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :popupParent="popupParent"
                :rowData="rowData"
                :enableRangeSelection="true"
                :enableCharts="true"
                :chartThemeOverrides="chartThemeOverrides"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "country", width: 150, chartDataType: "category" },
        { field: "gold", chartDataType: "series" },
        { field: "silver", chartDataType: "series" },
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
      popupParent: null,
      rowData: null,
      chartThemeOverrides: null,
    };
  },
  created() {
    this.popupParent = document.body;
    this.rowData = getData();
    this.chartThemeOverrides = {
      pie: {
        series: {
          fillOpacity: 0.8,
          strokeOpacity: 0.8,
          strokeWidth: 2,
          title: {
            enabled: true,
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "Arial, sans-serif",
            color: "maroon",
          },
          highlightStyle: {
            item: {
              fill: "red",
              stroke: "yellow",
            },
          },
          shadow: {
            color: "rgba(96, 96, 175, 0.5)",
            xOffset: 0,
            yOffset: 0,
            blur: 1,
          },
          label: {
            enabled: true,
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "Arial, sans-serif",
            color: "#2222aa",
            minAngle: 30,
          },
          callout: {
            strokeWidth: 3,
            colors: ["black", "#00ff00"],
            length: 15,
          },
          tooltip: {
            renderer: (params) => {
              return {
                content:
                  "<b>" +
                  params.angleName.toUpperCase() +
                  ":</b> " +
                  params.angleValue +
                  "<br>" +
                  "<b>" +
                  params.labelName.toUpperCase() +
                  ":</b> " +
                  params.datum[params.labelKey],
              };
            },
          },
        },
      },
    };
  },
  methods: {
    onFirstDataRendered(params) {
      var cellRange = {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ["country", "gold", "silver"],
      };
      var createRangeChartParams = {
        cellRange: cellRange,
        chartType: "doughnut",
      };
      params.api.createRangeChart(createRangeChartParams);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount("#app");
