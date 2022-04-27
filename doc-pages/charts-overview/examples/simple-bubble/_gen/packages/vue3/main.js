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
      data: getData().filter((d) => {
        return d.magnitude > 4;
      }),
      title: {
        text: 'Worldwide Earthquakes (first week of February 2020)',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: US Geological Survey',
      },
      series: [
        {
          type: 'scatter',
          xKey: 'depth',
          xName: 'Depth',
          yKey: 'magnitude',
          yName: 'Magnitude',
          sizeKey: 'minDistance',
          sizeName: 'Minimum Distance',
          marker: {
            size: 5,
            maxSize: 100,
            fill: '#41874b',
            stroke: '#41874b',
          },
          fillOpacity: 0.5,
        },
      ],
      axes: [
        {
          position: 'bottom',
          type: 'number',
          title: {
            text: 'Depth (m)',
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
        enabled: false,
      },
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount('#app');
