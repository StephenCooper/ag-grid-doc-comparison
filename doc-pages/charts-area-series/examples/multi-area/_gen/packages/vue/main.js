import { AgChartsVue } from 'ag-charts-vue';
import Vue from 'vue';

const ChartExample = {
  template: `
        <ag-charts-vue    
                :options="options"></ag-charts-vue>
    `,
  components: {
    'ag-charts-vue': AgChartsVue,
  },
  data: function () {
    return {
      options: null,
    };
  },
  created() {
    this.options = {
      theme: {
        palette: {
          fills: ['#f3622d', '#41a9c9'],
          strokes: ['#aa4520', '#2d768d'],
        },
      },
      title: {
        text: 'Microsoft Internet Explorer vs Google Chrome',
      },
      subtitle: {
        text: '2009-2019',
      },
      data: getData(),
      series: [
        {
          type: 'area',
          xKey: 'year',
          yKey: 'ie',
          yName: 'IE',
          fillOpacity: 0.7,
          marker: {
            enabled: true,
          },
        },
        {
          type: 'area',
          xKey: 'year',
          yKey: 'chrome',
          yName: 'Chrome',
          fillOpacity: 0.7,
          marker: {
            enabled: true,
          },
        },
      ],
      legend: {
        position: 'top',
      },
    };
  },
  mounted() {},
  methods: {},
};

new Vue({
  el: '#app',
  components: {
    'my-component': ChartExample,
  },
});
