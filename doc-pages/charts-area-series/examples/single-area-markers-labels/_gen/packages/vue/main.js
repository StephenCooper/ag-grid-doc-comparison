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
      title: {
        text: 'Internet Explorer Market Share',
      },
      subtitle: {
        text: '2009-2019 (aka "good times")',
      },
      data: getData(),
      series: [
        {
          type: 'area',
          xKey: 'year',
          yKey: 'ie',
          yName: 'IE',
          marker: {
            enabled: true,
          },
          label: {
            enabled: true,
            fontWeight: 'bold',
          },
          tooltip: {
            renderer: (params) => {
              return {
                content: `${params.xValue}: ${params.yValue.toFixed(1)}%`,
              };
            },
          },
        },
      ],
      legend: {
        enabled: false,
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
