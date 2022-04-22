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
            <div id="container">
                <ag-grid-vue
                
                style="width: 100%; height: 300px;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :enableRangeSelection="true"
                :enableCharts="true"
                :popupParent="popupParent"
                :createChartContainer="createChartContainer"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', width: 150, chartDataType: 'category' },
        { field: 'gold', chartDataType: 'series' },
        { field: 'silver', chartDataType: 'series' },
        { field: 'bronze', chartDataType: 'series' },
        { field: 'total', chartDataType: 'series' },
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
    };
  },
  created() {
    this.popupParent = document.body;
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

      fetch('https://www.ag-grid.com/example-assets/wide-spread-of-sports.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
    createChartContainer(chartRef) {
      var eChart = chartRef.chartElement;
      var eTemp = document.createElement('div');
      eTemp.innerHTML = chartPanelTemplate;
      var eChartWrapper = eTemp.firstChild;
      var eParent = document.querySelector('#container');
      eParent.appendChild(eChartWrapper);
      eChartWrapper.querySelector('.chart-wrapper-body').appendChild(eChart);
      eChartWrapper.querySelector('.chart-wrapper-title').innerText =
        'Chart Created At ' + new Date();
      eChartWrapper
        .querySelector('.chart-wrapper-close')
        .addEventListener('click', function () {
          chartRef.destroyChart();
          eParent.removeChild(eChartWrapper);
        });
    },
  },
};

var chartPanelTemplate =
  '<div class="chart-wrapper ag-theme-alpine">' +
  '<div class="chart-wrapper-top">' +
  '<span class="chart-wrapper-title"></span>' +
  '<button class="chart-wrapper-close">Destroy Chart</button>' +
  '</div>' +
  '<div class="chart-wrapper-body"></div>' +
  '</div>';

createApp(VueExample).mount('#app');
