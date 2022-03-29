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
      data: getData(),
      theme: {
        palette: {
          fills: ["#00c851", "#ffbb33", "#ff4444"],
          strokes: ["#006428", "#996500", "#a10000"],
        },
        overrides: {
          bar: {
            series: {
              strokeWidth: 0,
              highlightStyle: {
                series: {
                  strokeWidth: 1,
                  dimOpacity: 0.2,
                },
              },
            },
          },
        },
      },
      title: {
        text: "Internet Users by Geographical Location (2019)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Office for National Statistics",
      },
      series: [
        {
          type: "bar",
          xKey: "area",
          yKey: "usedInLast3Months",
          yName: "Used in last 3 months",
          normalizedTo: 1,
          stacked: true,
        },
        {
          type: "bar",
          xKey: "area",
          yKey: "usedOver3MonthsAgo",
          yName: "Used over 3 months ago",
          normalizedTo: 1,
          stacked: true,
        },
        {
          type: "bar",
          xKey: "area",
          yKey: "neverUsed",
          yName: "Never used",
          normalizedTo: 1,
          stacked: true,
        },
      ],
      axes: [
        {
          type: "category",
          position: "left",
          label: {
            rotation: -30,
          },
        },
        {
          type: "number",
          position: "bottom",
          label: {
            format: ".0%",
          },
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount("#app");
