import { createApp } from "vue";
import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community";
import { AgChartsVue } from "ag-charts-vue3";

const ChartExample = {
  template: `
        <div class="wrapper">
                <div id="toolPanel">
                    <button v-on:click="setTickCountTo5()">Set tick count to 5</button>
                    <span class="spacer"></span>
                    <button v-on:click="setTickCountTo10()">Set tick count to 10 (default)</button>
                </div>
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
      data: generateSpiralData(),
      series: [
        {
          type: "line",
          xKey: "x",
          yKey: "y",
          marker: {
            enabled: false,
          },
        },
      ],
      axes: [
        {
          type: "number",
          position: "bottom",
          tick: {
            count: 10,
          },
        },
        {
          type: "number",
          position: "left",
          tick: {
            count: 10,
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };
  },
  mounted() {},
  methods: {
    setTickCountTo5() {
      const options = cloneDeep(this.options);

      options.axes[0].tick.count = 5;
      options.axes[1].tick.count = 5;

      this.options = options;
    },
    setTickCountTo10() {
      const options = cloneDeep(this.options);

      options.axes[0].tick.count = 10;
      options.axes[1].tick.count = 10;

      this.options = options;
    },
  },
};

window.generateSpiralData = function generateSpiralData() {
  var a = 1;
  var b = 1;
  var data = [];
  var step = 0.1;
  for (var th = 1; th < 50; th += step) {
    var r = a + b * th;
    var datum = {
      x: r * Math.cos(th),
      y: r * Math.sin(th),
    };
    data.push(datum);
  }
  return data;
};

createApp(ChartExample).mount("#app");
