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
      theme: {
        overrides: {
          area: {
            series: {
              highlightStyle: {
                series: {
                  strokeWidth: 4,
                  dimOpacity: 0.3,
                },
              },
            },
          },
        },
      },
      title: {
        text: "UK Energy Sources (2018)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Department for Business, Energy & Industrial Strategy",
      },
      series: [
        {
          type: "area",
          xKey: "month",
          yKey: "coal",
          yName: "Coal",
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: "area",
          xKey: "month",
          yKey: "petroleum",
          yName: "Petroleum",
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: "area",
          xKey: "month",
          yKey: "naturalGas",
          yName: "Natural gas",
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: "area",
          xKey: "month",
          yKey: "bioenergyWaste",
          yName: "Bioenergy & waste",
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: "area",
          xKey: "month",
          yKey: "nuclear",
          yName: "Nuclear",
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: "area",
          xKey: "month",
          yKey: "windSolarHydro",
          yName: "Wind, solar & hydro",
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: "area",
          xKey: "month",
          yKey: "imported",
          yName: "Imported",
          normalizedTo: 100,
          stacked: true,
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
        },
        {
          type: "number",
          position: "left",
          label: {
            format: "#{.0f}%",
          },
          title: {
            enabled: true,
            text: "Normalized Percentage Energy",
          },
        },
      ],
      legend: {
        position: "top",
      },
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount("#app");
