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
          column: {
            series: {
              strokeWidth: 0,
              tooltip: {
                renderer: tooltipRenderer,
              },
            },
          },
        },
      },
      title: {
        text: "WEEE Collected in UK (2019)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Environmental Agency",
      },
      tooltip: {
        class: "my-tooltip",
      },
      series: [
        {
          type: "column",
          xKey: "quarter",
          yKey: "largeHousehold",
          yName: "Large household appliances",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "smallHousehold",
          yName: "Small household appliances",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "itTelecomms",
          yName: "IT and telecomms equipment",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "consumer",
          yName: "Consumer equipment",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "tools",
          yName: "Electrical and electronic tools",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "displays",
          yName: "Display equipment",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "cooling",
          yName: "Cooling appliances containing refrigerants",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "gasLampsLed",
          yName: "Gas discharge lamps and LED light sources",
          stacked: true,
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
          title: {
            enabled: true,
            text: "Waste collected (tonnes)",
          },
          label: {
            formatter: (params) => {
              return params.value / 1000 + "k";
            },
          },
        },
      ],
      legend: {
        position: "bottom",
      },
    };
  },
  mounted() {},
  methods: {},
};

window.tooltipRenderer = function tooltipRenderer(params) {
  var formatThousands = function (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  var tooltipHtml = [
    '<div class="my-tooltip">',
    '<span class="my-tooltip__title" style="color: ' +
      params.color +
      '">' +
      params.yName,
    "(" +
      params.datum[params.xKey] +
      "):</span> " +
      formatThousands(params.datum[params.yKey]) +
      " tonnes",
    "</div>",
  ];
  return tooltipHtml.join("\n");
};

new Vue({
  el: "#app",
  components: {
    "my-component": ChartExample,
  },
});
