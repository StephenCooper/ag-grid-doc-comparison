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
      type: 'hierarchy',

      data,
      series: [
        {
          type: 'treemap',
          labelKey: 'orgHierarchy',
          colorParents: true,
          gradient: false,
          nodePadding: 5,
          sizeKey: undefined,
          colorKey: undefined,
          colorDomain: [0, 2, 4],
          colorRange: ['#d73027', '#fee08b', '#1a9850'],
        },
      ],
      title: {
        text: 'Organizational Chart',
      },
      subtitle: {
        text: 'of a top secret startup',
      },
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount('#app');
