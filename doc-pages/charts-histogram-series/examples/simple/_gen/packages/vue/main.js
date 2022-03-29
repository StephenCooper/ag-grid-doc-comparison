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
        text: "Race demographics",
      },
      data: getData(),
      series: [
        {
          type: "histogram",
          xKey: "age",
          xName: "Participant Age",
        },
      ],
      legend: {
        enabled: false,
      },
      axes: [
        {
          type: "number",
          position: "bottom",
          title: { text: "Age band (years)" },
        },
        {
          type: "number",
          position: "left",
          title: { text: "Number of participants" },
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
