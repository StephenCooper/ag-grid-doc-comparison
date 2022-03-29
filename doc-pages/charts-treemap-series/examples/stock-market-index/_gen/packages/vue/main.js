import { AgChartsVue } from "ag-charts-vue";
import Vue from "vue";

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
      type: "hierarchy",

      data,
      series: [
        {
          type: "treemap",
          labelKey: "name",
          sizeKey: "size",
          colorKey: "color",
          tooltip: {
            renderer: (params) => {
              return {
                content: `<b>Change</b>: ${params.datum.colorValue.toFixed(
                  2
                )}%`,
              };
            },
          },
        },
      ],
      title: {
        text: "S&P 500 index stocks categorized by sectors and industries.",
      },
      subtitle: {
        text: "Area represents market cap. Color represents change from the day before.",
      },
    };
  },
  mounted() {},
  methods: {},
};

new Vue({
  el: "#app",
  components: {
    "my-component": ChartExample,
  },
});
