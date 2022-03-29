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
      title: {
        text: "Browser Wars",
      },
      subtitle: {
        text: "2009-2019",
      },
      data: getData(),
      series: [
        {
          type: "area",
          xKey: "year",
          yKey: "ie",
          yName: "IE",
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: "area",
          xKey: "year",
          yKey: "firefox",
          yName: "Firefox",
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: "area",
          xKey: "year",
          yKey: "safari",
          yName: "Safari",
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: "area",
          xKey: "year",
          yKey: "chrome",
          yName: "Chrome",
          normalizedTo: 100,
          stacked: true,
        },
      ],
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
