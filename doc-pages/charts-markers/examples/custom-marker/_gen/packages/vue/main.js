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
      title: {
        text: "Fuel Spending (2019)",
      },
      data: getData(),
      series: [
        {
          xKey: "quarter",
          yKey: "electric",
          title: "Electric",
          marker: {
            shape: heartFactory(),
            size: 16,
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

window.heartFactory = function heartFactory() {
  class Heart extends agCharts.Marker {
    rad(degree) {
      return (degree / 180) * Math.PI;
    }
    updatePath() {
      const { x, path, size, rad } = this;
      const r = size / 4;
      const y = this.y + r / 2;
      path.clear();
      path.cubicArc(x - r, y - r, r, r, 0, rad(130), rad(330), 0);
      path.cubicArc(x + r, y - r, r, r, 0, rad(220), rad(50), 0);
      path.lineTo(x, y + r);
      path.closePath();
    }
  }
  return Heart;
};

new Vue({
  el: "#app",
  components: {
    "my-component": ChartExample,
  },
});
