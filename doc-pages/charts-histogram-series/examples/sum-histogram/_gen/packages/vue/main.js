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
        text: "Prize money distribution",
      },
      subtitle: {
        text: "Total winnings by participant age",
      },
      data: getData(),
      series: [
        {
          type: "histogram",
          xKey: "age",
          xName: "Participant Age",
          yKey: "winnings",
          yName: "Winnings",
          aggregation: "sum",
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
          title: { text: "Total winnings (USD)" },
        },
      ],
      height: 550,
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
