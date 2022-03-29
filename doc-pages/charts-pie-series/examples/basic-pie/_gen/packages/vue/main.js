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
      data: [
        { value: 56.9 },
        { value: 22.5 },
        { value: 6.8 },
        { value: 8.5 },
        { value: 2.6 },
        { value: 1.9 },
      ],
      series: [
        {
          type: "pie",
          angleKey: "value",
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
