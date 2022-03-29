import { AgChartsVue } from "ag-charts-vue3";
import { createApp } from "vue";

const ChartExample = {
  template: `
        <ag-charts-vue
                :options="options"></ag-charts-vue>
    `,
  components: {
    "ag-charts-vue": AgChartsVue,
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
        text: "People Born",
      },
      subtitle: {
        text: "2008-2020",
      },
      series: [
        {
          xKey: "year",
          yKey: "visitors",
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

createApp(ChartExample).mount("#app");
