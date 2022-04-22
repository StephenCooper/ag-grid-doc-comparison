import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

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
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'country', width: 150, chartDataType: 'category' },
        { field: 'gold', chartDataType: 'series' },
        { field: 'silver', chartDataType: 'series' },
        { field: 'bronze', chartDataType: 'series' },
        {
          headerName: 'A',
          valueGetter: 'Math.floor(Math.random()*1000)',
          chartDataType: 'series',
        },
        {
          headerName: 'B',
          valueGetter: 'Math.floor(Math.random()*1000)',
          chartDataType: 'series',
        },
        {
          headerName: 'C',
          valueGetter: 'Math.floor(Math.random()*1000)',
          chartDataType: 'series',
        },
        {
          headerName: 'D',
          valueGetter: 'Math.floor(Math.random()*1000)',
          chartDataType: 'series',
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
      histogram: {
        series: {
          bins: [
            [0, 10],
            [10, 40],
            [40, 80],
            [80, 100],
          ],
          fillOpacity: 0.8,
          strokeOpacity: 0.8,
          strokeWidth: 4,
          shadow: {
            enabled: true,
            color: 'rgba(0, 0, 0, 0.3)',
            xOffset: 10,
            yOffset: 10,
            blur: 8,
          },
          label: {
            enabled: true,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 15,
            fontFamily: 'Arial, sans-serif',
            color: 'green',
            formatter: (params) => {
              return '<' + params.value + '>';
            },
          },
          highlightStyle: {
            item: {
              fill: 'black',
              stroke: 'yellow',
            },
          },
          tooltip: {
            renderer: function (params) {
              var bin = params.datum;
              var binSize = bin.frequency;
              var medalColour = params.xKey;
              return {
                content:
                  binSize +
                  (binSize >= 2 ? ' countries' : ' country') +
                  ' got between ' +
                  params.xValue[0] +
                  ' and ' +
                  params.xValue[1] +
                  ' ' +
                  medalColour +
                  ' medals',
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
        rowEndIndex: 20,
        columns: ['bronze'],
      };
      var createRangeChartParams = {
        cellRange: cellRange,
        chartType: 'histogram',
      };
      params.api.createRangeChart(createRangeChartParams);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
