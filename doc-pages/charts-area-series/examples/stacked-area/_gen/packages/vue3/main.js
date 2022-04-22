import { AgChartsVue } from 'ag-charts-vue3';
import { createApp } from 'vue';

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
        text: 'Browser Wars',
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
          stacked: true,
        },
        {
          type: 'area',
          xKey: 'year',
          yKey: 'firefox',
          yName: 'Firefox',
          stacked: true,
        },
        {
          type: 'area',
          xKey: 'year',
          yKey: 'safari',
          yName: 'Safari',
          stacked: true,
        },
        {
          type: 'area',
          xKey: 'year',
          yKey: 'chrome',
          yName: 'Chrome',
          stacked: true,
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount('#app');
