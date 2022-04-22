import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <label>Switch Axis to: </label>
            <button id="axisBtn" v-on:click="toggleAxis()" value="time">Category</button>
            <div class="wrapper">
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
                :getChartToolbarItems="getChartToolbarItems"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
                <div id="myChart" class="ag-theme-alpine my-chart"></div>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: getColumnDefs(),
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
      popupParent: null,
      rowData: null,
      chartThemeOverrides: null,
    };
  },
  created() {
    this.popupParent = document.body;
    this.rowData = getRowData();
    this.chartThemeOverrides = {
      line: {
        title: {
          enabled: true,
          text: 'Average Daily Temperatures',
        },
        legend: {
          enabled: false,
        },
        padding: {
          top: 15,
          bottom: 25,
        },
        navigator: {
          enabled: true,
          height: 20,
          margin: 25,
        },
        axes: {
          time: {
            label: {
              rotation: 0,
              format: '%d %b',
            },
          },
          category: {
            label: {
              rotation: 0,
              formatter: (params) => {
                return moment(new Date(params.value)).format('DD MMM');
              },
            },
          },
          number: {
            label: {
              formatter: function (params) {
                return params.value + '°C';
              },
            },
          },
        },
      },
    };
  },
  methods: {
    onFirstDataRendered(params) {
      if (currentChartRef) {
        currentChartRef.destroyChart();
      }
      var createRangeChartParams = {
        chartContainer: document.querySelector('#myChart'),
        suppressChartRanges: true,
        cellRange: {
          columns: ['date', 'avgTemp'],
        },
        chartType: 'line',
      };
      currentChartRef = params.api.createRangeChart(createRangeChartParams);
    },
    toggleAxis() {
      var axisBtn = document.querySelector('#axisBtn');
      axisBtn.textContent = axisBtn.value;
      axisBtn.value = axisBtn.value === 'time' ? 'category' : 'time';
      const columnDefs = getColumnDefs();
      columnDefs.forEach(function (colDef) {
        if (colDef.field === 'date') {
          colDef.chartDataType = axisBtn.value;
        }
      });
      this.gridApi.setColumnDefs(columnDefs);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    getChartToolbarItems() {
      return ['chartData', 'chartFormat'];
    },
  },
};

window.getColumnDefs = function getColumnDefs() {
  return [
    { field: 'date', valueFormatter: dateFormatter },
    { field: 'avgTemp' },
  ];
};

window.dateFormatter = function dateFormatter(params) {
  return params.value
    ? params.value.toISOString().substring(0, 10)
    : params.value;
};

window.getRowData = function getRowData() {
  return [
    { date: new Date(2019, 0, 1), avgTemp: 8.27 },
    { date: new Date(2019, 0, 5), avgTemp: 7.22 },
    { date: new Date(2019, 0, 8), avgTemp: 11.54 },
    { date: new Date(2019, 0, 11), avgTemp: 8.44 },
    { date: new Date(2019, 0, 22), avgTemp: 12.03 },
    { date: new Date(2019, 0, 23), avgTemp: 9.68 },
    { date: new Date(2019, 0, 24), avgTemp: 9.9 },
    { date: new Date(2019, 0, 25), avgTemp: 8.74 },
  ];
};

var currentChartRef;

createApp(VueExample).mount('#app');
