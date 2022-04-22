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
        text: 'GDP by country in billions of USD (2018)',
      },
      data: [
        {
          country: 'Spain',
          gdp: 1419,
        },
        {
          country: 'UK',
          gdp: 2855,
        },
        {
          country: 'Germany',
          gdp: 3948,
        },
        {
          country: 'France',
          gdp: 2778,
        },
      ],
      series: [
        {
          type: 'column',
          xKey: 'country',
          yKey: 'gdp',
          showInLegend: false,
          formatter: (params) => {
            return {
              fill:
                params.datum[params.xKey] === 'UK'
                  ? params.highlighted
                    ? 'lime'
                    : 'red'
                  : params.fill,
            };
          },
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount('#app');
