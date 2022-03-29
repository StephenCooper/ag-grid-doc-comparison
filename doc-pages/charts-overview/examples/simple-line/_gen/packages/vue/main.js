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
          line: {
            series: {
              highlightStyle: {
                series: {
                  strokeWidth: 3,
                  dimOpacity: 0.2,
                },
              },
            },
          },
        },
      },
      title: {
        text: "Road fuel prices (2019)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Department for Business, Energy & Industrial Strategy",
      },
      series: [
        {
          type: "line",
          xKey: "date",
          yKey: "petrol",
          stroke: "#01c185",
          marker: {
            stroke: "#01c185",
            fill: "#01c185",
          },
        },
        {
          type: "line",
          xKey: "date",
          yKey: "diesel",
          stroke: "#000000",
          marker: {
            stroke: "#000000",
            fill: "#000000",
          },
        },
      ],
      axes: [
        {
          position: "bottom",
          type: "time",
          tick: {
            count: agCharts.time.month.every(2),
          },
          title: {
            enabled: true,
            text: "Date",
          },
        },
        {
          position: "left",
          type: "number",
          title: {
            enabled: true,
            text: "Price in pence",
          },
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
