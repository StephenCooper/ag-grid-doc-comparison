import { createApp } from "vue";
import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community";
import { AgChartsVue } from "ag-charts-vue3";

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
        text: "Number of Cars Sold",
      },
      subtitle: {
        text: "(click a column for details)",
      },
      data: [
        { month: "March", units: 25, brands: { BMW: 10, Toyota: 15 } },
        { month: "April", units: 27, brands: { Ford: 17, BMW: 10 } },
        { month: "May", units: 42, brands: { Nissan: 20, Toyota: 22 } },
      ],
      series: [
        {
          type: "column",
          xKey: "month",
          yKey: "units",
          listeners: {
            nodeClick: (event) => {
              var datum = event.datum;
              window.alert(
                "Cars sold in " +
                  datum[event.xKey] +
                  ": " +
                  String(datum[event.yKey]) +
                  "\n" +
                  listUnitsSoldByBrand(datum["brands"])
              );
            },
          },
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

createApp(ChartExample).mount("#app");
