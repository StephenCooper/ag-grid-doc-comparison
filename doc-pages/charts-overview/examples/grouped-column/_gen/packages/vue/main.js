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
      autoSize: true,
      data: getData(),
      theme: {
        overrides: {
          column: {
            series: {
              strokeWidth: 0,
              highlightStyle: {
                strokeWidth: 1,
              },
            },
          },
        },
      },
      title: {
        text: "Regular Internet Users",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Office for National Statistics",
      },
      series: [
        { type: "column", xKey: "year", yKey: "16-24" },
        { type: "column", xKey: "year", yKey: "25-34" },
        { type: "column", xKey: "year", yKey: "35-44" },
        { type: "column", xKey: "year", yKey: "45-54" },
        { type: "column", xKey: "year", yKey: "55-64" },
        { type: "column", xKey: "year", yKey: "65-74" },
        { type: "column", xKey: "year", yKey: "75+" },
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
            formatter: (params) => {
              return params.value / 1000 + "M";
            },
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
