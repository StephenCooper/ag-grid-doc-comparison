import { createApp } from "vue";
import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community";
import { AgChartsVue } from "ag-charts-vue3";

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
      data: getData().sort((a, b) => {
        return getTotal(b) - getTotal(a);
      }),
      theme: {
        overrides: {
          bar: {
            series: {
              strokeWidth: 0,
              highlightStyle: {
                series: {
                  strokeWidth: 1,
                  dimOpacity: 0.3,
                },
              },
            },
          },
        },
      },
      title: {
        text: "UK Housing Stock (2016)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Ministry of Housing, Communities & Local Government",
      },
      series: [
        {
          type: "bar",
          xKey: "type",
          yKey: "ownerOccupied",
          yName: "Owner occupied",
          stacked: true,
        },
        {
          type: "bar",
          xKey: "type",
          yKey: "privateRented",
          yName: "Private rented",
          stacked: true,
        },
        {
          type: "bar",
          xKey: "type",
          yKey: "localAuthority",
          yName: "Local authority",
          stacked: true,
        },
        {
          type: "bar",
          xKey: "type",
          yKey: "housingAssociation",
          yName: "Housing association",
          stacked: true,
        },
      ],
      axes: [
        {
          type: "category",
          position: "left",
        },
        {
          type: "number",
          position: "top",
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

window.getTotal = function getTotal(datum) {
  return (
    datum.ownerOccupied +
    datum.privateRented +
    datum.localAuthority +
    datum.housingAssociation
  );
};

createApp(ChartExample).mount("#app");
