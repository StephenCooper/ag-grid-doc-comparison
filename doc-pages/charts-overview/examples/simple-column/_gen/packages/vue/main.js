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
      autoSize: true,
      data: getData(),
      title: {
        text: 'Total Visitors to Museums and Galleries',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: Department for Digital, Culture, Media & Sport',
      },
      series: [
        {
          type: 'column',
          xKey: 'year',
          yKey: 'visitors',
          fill: '#0084e7',
          strokeWidth: 0,
          shadow: {
            enabled: true,
            xOffset: 3,
          },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            enabled: true,
            text: 'Year',
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            enabled: true,
            text: 'Total visitors',
          },
          label: {
            formatter: (params) => {
              return params.value / 1000000 + 'M';
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
