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
          fills: ["#5BC0EB", "#FDE74C", "#9BC53D", "#E55934", "#FA7921"],
          strokes: ["#4086a4", "#b1a235", "#6c8a2b", "#a03e24", "#af5517"],
        },
        overrides: {
          column: {
            series: {
              strokeWidth: 0,
              highlightStyle: {
                series: {
                  strokeWidth: 1,
                  dimOpacity: 0.3,
                },
              },
            },
          },
        },
      },
      title: {
        text: "Average Station Entries: Victoria Line (2010)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Transport for London",
      },
      series: [
        {
          type: "column",
          xKey: "station",
          yKey: "early",
          stacked: true,
          yName: "Early",
        },
        {
          type: "column",
          xKey: "station",
          yKey: "morningPeak",
          yName: "Morning peak",
          stacked: true,
        },
        {
          type: "column",
          xKey: "station",
          yKey: "interPeak",
          yName: "Between peak",
          stacked: true,
        },
        {
          type: "column",
          xKey: "station",
          yKey: "afternoonPeak",
          yName: "Afternoon peak",
          stacked: true,
        },
        {
          type: "column",
          xKey: "station",
          yKey: "evening",
          yName: "Evening",
          stacked: true,
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          label: {
            rotation: 30,
          },
        },
        {
          type: "number",
          position: "left",
          label: {
            formatter: (params) => {
              return params.value / 1000 + "k";
            },
          },
        },
      ],
      legend: {
        spacing: 40,
        position: "bottom",
      },
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount("#app");
