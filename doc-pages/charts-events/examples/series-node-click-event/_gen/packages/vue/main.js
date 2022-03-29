import Vue from "vue";
import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community";
import { AgChartsVue } from "ag-charts-vue";

const ChartExample = {
  template: `
        <div class="wrapper">
                <ag-charts-vue    
                :options="options"></ag-charts-vue>
            </div>
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
        text: "Average low/high temperatures in London",
      },
      subtitle: {
        text: "(click a data point for details)",
      },
      data: [
        { month: "March", low: 3.9, high: 11.3 },
        { month: "April", low: 5.5, high: 14.2 },
        { month: "May", low: 8.7, high: 17.9 },
      ],
      series: [
        {
          type: "line",
          xKey: "month",
          yKey: "high",
        },
        {
          type: "column",
          xKey: "month",
          yKey: "low",
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
        },
        {
          type: "number",
          position: "left",
        },
      ],
      legend: {
        enabled: false,
      },
      tooltip: {
        tracking: false,
      },
      listeners: {
        seriesNodeClick: (event) => {
          var datum = event.datum;
          window.alert(
            "Temperature in " +
              datum[event.xKey] +
              ": " +
              String(datum[event.yKey]) +
              "°C" +
              "\nSeries: " +
              event.series.id
          );
        },
      },
    };
  },
  mounted() {},
  methods: {},
};

window.listUnitsSoldByBrand = function listUnitsSoldByBrand(brands) {
  var result = "";
  for (var key in brands) {
    result += key + ": " + brands[key] + "\n";
  }
  return result;
};

new Vue({
  el: "#app",
  components: {
    "my-component": ChartExample,
  },
});
