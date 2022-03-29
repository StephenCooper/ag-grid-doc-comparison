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
        text: "Vehicle fuel efficiency by engine size (USA 1987)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: UCI",
      },
      series: [
        {
          type: "histogram",
          xKey: "engine-size",
          xName: "Engine Size",
          yKey: "highway-mpg",
          yName: "Highway MPG",
          fill: "#41874b",
          stroke: "#41874b",
          fillOpacity: 0.5,
          aggregation: "mean",
        },
        {
          type: "scatter",
          xKey: "engine-size",
          xName: "Engine Size",
          yKey: "highway-mpg",
          yName: "Highway MPG",
          fill: "#333",
          stroke: "#333",
          fillOpacity: 0.5,
        },
      ],
      axes: [
        {
          position: "bottom",
          type: "number",
          title: {
            enabled: true,
            text: "Engine Size (Cubic inches)",
          },
        },
        {
          position: "left",
          type: "number",
          title: {
            enabled: true,
            text: "Highway MPG",
          },
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
