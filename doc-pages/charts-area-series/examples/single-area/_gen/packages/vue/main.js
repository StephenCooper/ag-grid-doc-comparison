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
      title: {
        text: "Internet Explorer Market Share",
      },
      subtitle: {
        text: '2009-2019 (aka "good times")',
      },
      data: getData(),
      series: [
        {
          type: "area",
          xKey: "year",
          yKey: "ie",
          yName: "IE",
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

new Vue({
  el: "#app",
  components: {
    "my-component": ChartExample,
  },
});
