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
        text: 'Height vs Weight for Major League Baseball Players',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: Statistics Online Computational Resource',
      },
      series: [
        {
          type: 'scatter',
          xKey: 'weight',
          yKey: 'height',
          fillOpacity: 0.5,
          strokeOpacity: 0,
          marker: {
            size: 12,
            fill: '#002D72',
          },
        },
      ],
      axes: [
        {
          position: 'bottom',
          type: 'number',
          title: {
            text: 'Weight (pounds)',
          },
        },
        {
          position: 'left',
          type: 'number',
          title: {
            text: 'Height (inches)',
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
