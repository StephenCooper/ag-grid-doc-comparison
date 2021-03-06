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
      theme: {
        palette: {
          fills: [
            '#5BC0EB',
            '#FDE74C',
            '#9BC53D',
            '#E55934',
            '#FA7921',
            '#fa3081',
          ],
          strokes: [
            '#5BC0EB',
            '#FDE74C',
            '#9BC53D',
            '#E55934',
            '#FA7921',
            '#fa3081',
          ],
        },
        overrides: {
          line: { series: { strokeWidth: 3, marker: { enabled: false } } },
        },
      },
      autoSize: true,
      title: {
        text: 'Earthquake Magnitudes by Source (January 2020)',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: US Geological Survey',
      },
      padding: {
        left: 40,
        right: 40,
      },
      series: [
        {
          data: data.ci,
          type: 'line',
          title: 'Southern California Seismic Network',
          xKey: 'time',
          yKey: 'magnitude',
        },
        {
          data: data.hv,
          type: 'line',
          title: 'Hawaiian Volcano Observatory Network',
          xKey: 'time',
          yKey: 'magnitude',
        },
        {
          data: data.nc,
          type: 'line',
          title: 'USGS Northern California Network',
          xKey: 'time',
          yKey: 'magnitude',
        },
        {
          data: data.ok,
          type: 'line',
          title: 'Oklahoma Seismic Network',
          xKey: 'time',
          yKey: 'magnitude',
        },
      ],
      axes: [
        {
          position: 'bottom',
          type: 'time',
          label: {
            format: '%d/%m',
            rotation: 30,
          },
        },
        {
          position: 'left',
          type: 'number',
          title: {
            text: 'Magnitude',
          },
        },
      ],
      legend: {
        position: 'bottom',
        item: {
          marker: {
            strokeWidth: 0,
          },
        },
      },
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount('#app');
