import { createApp } from "vue";
import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community";
import { AgChartsVue } from "ag-charts-vue3";

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
      title: {
        text: "Mean Sea Level (mm)",
      },

      data: getData(),
      series: [
        {
          type: "scatter",
          xKey: "time",
          yKey: "mm",
          showInLegend: false,
        },
      ],
      axes: [
        {
          type: "number",
          position: "bottom",
        },
        {
          type: "number",
          position: "left",
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount("#app");
