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
      autoSize: true,
      data: getData(),
      title: {
        text: 'Engine size distribution (USA 1987)',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: UCI',
      },
      series: [
        {
          type: 'histogram',
          xKey: 'engine-size',
          xName: 'Engine Size',
          fillOpacity: 0.5,
        },
      ],
      axes: [
        {
          position: 'bottom',
          type: 'number',
          title: {
            text: 'Engine Size (Cubic inches)',
          },
        },
        {
          position: 'left',
          type: 'number',
          title: {
            text: 'Frequency',
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

createApp(ChartExample).mount('#app');
