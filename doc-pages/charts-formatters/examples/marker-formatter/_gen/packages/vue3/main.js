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
        text: 'Fuel Spending (2019)',
      },
      data: [
        {
          quarter: 'Q1',
          petrol: 200,
          electric: 50,
        },
        {
          quarter: 'Q2',
          petrol: 300,
          electric: 60,
        },
        {
          quarter: 'Q3',
          petrol: 350,
          electric: 70,
        },
        {
          quarter: 'Q4',
          petrol: 400,
          electric: 50,
        },
      ],
      series: [
        {
          type: 'area',
          xKey: 'quarter',
          yKey: 'petrol',
          yName: 'Petrol',
          stacked: true,
          marker: { formatter },
        },
        {
          type: 'area',
          xKey: 'quarter',
          yKey: 'electric',
          yName: 'Electric',
          stacked: true,
          marker: { formatter },
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};

window.formatter = function formatter({ yKey, size }) {
  return { size: yKey === 'electric' ? 12 : size };
};

createApp(ChartExample).mount('#app');
