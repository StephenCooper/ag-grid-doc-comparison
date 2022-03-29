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
      autoSize: true,
      data: getData(),
      theme: {
        overrides: {
          bar: {
            series: {
              strokeWidth: 0,
            },
          },
        },
      },
      title: {
        text: "Gross Weekly Earnings by Occupation (Q4 2019)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Office for National Statistics",
      },
      series: [
        {
          type: "bar",
          xKey: "type",
          yKey: "earnings",
        },
      ],
      axes: [
        {
          type: "category",
          position: "left",
        },
        {
          type: "number",
          position: "bottom",
          title: {
            enabled: true,
            text: "£/week",
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

new Vue({
  el: "#app",
  components: {
    "my-component": ChartExample,
  },
});
