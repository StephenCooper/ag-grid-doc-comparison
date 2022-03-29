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
      data: data,

      title: {
        text: "Beverage Expenses",
      },
      subtitle: {
        text: "per quarter",
      },
      series: [
        {
          type: "pie",
          title: {
            text: "Q1",
            showInLegend: true,
          },
          label: {
            enabled: false,
          },
          angleKey: "Q1",
          labelKey: "beverage",
          showInLegend: true,
          outerRadiusOffset: 0,
          innerRadiusOffset: -20,
          highlightStyle,
        },
        {
          type: "pie",
          title: {
            text: "Q2",
            showInLegend: true,
          },
          label: {
            enabled: false,
          },
          angleKey: "Q2",
          labelKey: "beverage",
          outerRadiusOffset: -40,
          innerRadiusOffset: -60,
          highlightStyle,
        },
        {
          type: "pie",
          title: {
            text: "Q3",
            showInLegend: true,
          },
          label: {
            enabled: false,
          },
          angleKey: "Q3",
          labelKey: "beverage",
          outerRadiusOffset: -80,
          innerRadiusOffset: -100,
          highlightStyle,
        },
        {
          type: "pie",
          title: {
            text: "Q4",
            showInLegend: true,
          },
          label: {
            enabled: false,
          },
          angleKey: "Q4",
          labelKey: "beverage",
          outerRadiusOffset: -120,
          innerRadiusOffset: -140,
          highlightStyle,
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};

const data = [
  {
    beverage: "Coffee",
    Q1: 450,
    Q2: 560,
    Q3: 600,
    Q4: 700,
  },
  {
    beverage: "Tea",
    Q1: 270,
    Q2: 380,
    Q3: 450,
    Q4: 520,
  },
  {
    beverage: "Milk",
    Q1: 180,
    Q2: 170,
    Q3: 190,
    Q4: 200,
  },
];

const highlightStyle = {
  item: {
    fill: "red",
    stroke: "maroon",
    strokeWidth: 4,
  },
  series: {
    dimOpacity: 0.2,
    strokeWidth: 2,
  },
};

new Vue({
  el: "#app",
  components: {
    "my-component": ChartExample,
  },
});
