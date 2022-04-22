import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="wrapper">
                <div id="buttons">
                    <button v-on:click="downloadChartImage('image/png')">Download chart PNG</button>
                    <button v-on:click="downloadChartImage('image/jpeg')">Download chart JPEG</button>
                    <button v-on:click="openChartImage('image/png')">Open PNG</button>
                    <button v-on:click="openChartImage('image/jpeg')">Open JPEG</button>
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
                :chartThemeOverrides="chartThemeOverrides"
                @first-data-rendered="onFirstDataRendered"
                @chart-created="onChartCreated"></ag-grid-vue>
                <div id="myChart" class="ag-theme-alpine my-chart">
            </div></div>
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
      chartThemeOverrides: null,
    };
  },
  created() {
    this.rowData = getData();
    this.popupParent = document.body;
    this.chartThemeOverrides = {
      cartesian: {
        axes: {
          category: {
            label: {
              rotation: 335,
            },
          },
        },
      },
    };
  },
  methods: {
    onFirstDataRendered(params) {
      const createRangeChartParams = {
        cellRange: {
          columns: ['country', 'sugar', 'fat', 'weight'],
        },
        chartType: 'groupedColumn',
        chartContainer: document.querySelector('#myChart'),
      };
      params.api.createRangeChart(createRangeChartParams);
    },
    onChartCreated(event) {
      chartId = event.chartId;
    },
    downloadChartImage(fileFormat) {
      if (!chartId) {
        return;
      }
      const params = { fileFormat, chartId };
      const imageDataURL = this.gridApi.getChartImageDataURL(params);
      if (imageDataURL) {
        const a = document.createElement('a');
        a.href = imageDataURL;
        a.download = 'image';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },
    openChartImage(fileFormat) {
      if (!chartId) {
        return;
      }
      const params = { fileFormat, chartId };
      const imageDataURL = this.gridApi.getChartImageDataURL(params);
      if (imageDataURL) {
        const image = new Image();
        image.src = imageDataURL;
        const w = window.open('');
        w.document.write(image.outerHTML);
        w.document.close();
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

var chartId;

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
