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
        text: 'Dwelling Fires (UK)',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: Home Office',
      },
      series: [
        {
          type: 'pie',
          labelKey: 'type',
          fillOpacity: 0.9,
          strokeWidth: 0,
          angleKey: '2018/19',
          label: {
            enabled: false,
          },
          title: {
            text: '2018/19',
          },
          innerRadiusOffset: -100,
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount('#app');
