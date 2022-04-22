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
            <div class="wrapper">
                <div id="buttons">
                    <button v-on:click="saveChart()">Save chart</button>
                    <button v-on:click="clearChart()">Clear chart</button>
                    <button v-on:click="restoreChart()">Restore chart</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :enableRangeSelection="true"
                :popupParent="popupParent"
                :enableCharts="true"
                :createChartContainer="createChartContainer"></ag-grid-vue>
                <div id="myChart" class="ag-theme-alpine my-chart"></div>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'country', chartDataType: 'category' },
        { field: 'sugar', chartDataType: 'series' },
        { field: 'fat', chartDataType: 'series' },
        { field: 'weight', chartDataType: 'series' },
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
    saveChart() {
      var chartModels = this.gridApi.getChartModels() || [];
      if (chartModels.length > 0) {
        chartModel = chartModels[0];
      }
      alert('Chart saved!');
    },
    clearChart() {
      if (currentChartRef) {
        currentChartRef.destroyChart();
        currentChartRef = null;
      }
    },
    restoreChart() {
      if (!chartModel) return;
      currentChartRef = this.gridApi.restoreChart(chartModel);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    createChartContainer(chartRef) {
      // destroy existing chart
      if (currentChartRef) {
        currentChartRef.destroyChart();
      }
      var eChart = chartRef.chartElement;
      var eParent = document.querySelector('#myChart');
      eParent.appendChild(eChart);
      currentChartRef = chartRef;
    },
  },
};

var chartModel;

var currentChartRef;

createApp(VueExample).mount('#app');
