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
        text: "Most Populous Cities (2019)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Simple Maps",
      },
      series: [
        {
          type: "scatter",
          title: "Most populous cities",
          xKey: "lon",
          xName: "Longitude",
          yKey: "lat",
          yName: "Latitude",
          sizeKey: "population",
          sizeName: "Population",
          labelKey: "city",
          labelName: "City",
          marker: {
            size: 5,
            maxSize: 100,
          },
          fillOpacity: 0.5,
        },
      ],
      axes: [
        {
          position: "bottom",
          type: "number",
          title: {
            enabled: true,
            text: "Longitude",
          },
          min: -180,
          max: 180,
          nice: false,
        },
        {
          position: "left",
          type: "number",
          title: {
            enabled: true,
            text: "Latitude",
          },
          min: -90,
          max: 90,
          nice: false,
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
