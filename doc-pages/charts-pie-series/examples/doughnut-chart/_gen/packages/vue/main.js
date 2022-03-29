import Vue from "vue";
import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community";
import { AgChartsVue } from "ag-charts-vue";

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
      data: [
        { os: "Android", share: 56.9 },
        { os: "iOS", share: 22.5 },
        { os: "BlackBerry", share: 6.8 },
        { os: "Symbian", share: 8.5 },
        { os: "Bada", share: 2.6 },
        { os: "Windows", share: 1.9 },
      ],
      series: [
        {
          type: "pie",
          labelKey: "os",
          angleKey: "share",
          innerRadiusOffset: -70,
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
