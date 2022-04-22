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
        text: "Apple's revenue by product category",
      },
      subtitle: {
        text: 'in billion U.S. dollars',
      },
      data: getData(),
      series: [
        {
          type: 'column',
          xKey: 'quarter',
          yKey: 'iphone',
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount('#app');
