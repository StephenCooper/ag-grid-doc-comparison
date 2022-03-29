import { AgChartsVue } from "ag-charts-vue";
import { cloneDeep } from "lodash";
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
      autoSize: true,
      data: getData(),
      theme: {
        palette: {
          fills: ["#ec4d3d", "#4facf2"],
          strokes: ["#ec4d3d", "#4facf2"],
        },
        overrides: { area: { series: { fillOpacity: 0.5 } } },
      },
      title: {
        text: "Simulated CPU Usage",
        fontSize: 18,
      },
      series: [
        {
          type: "area",
          xKey: "time",
          yKey: "system",
          stacked: true,
          yName: "System",
        },
        {
          type: "area",
          xKey: "time",
          yKey: "user",
          stacked: true,
          yName: "User",
        },
      ],
      axes: [
        {
          type: "time",
          position: "bottom",
          nice: false,
        },
        {
          type: "number",
          position: "left",
          title: {
            enabled: true,
            text: "Load (%)",
          },
          min: 0,
          max: 100,
        },
      ],
      legend: {
        position: "bottom",
      },
    };
  },
  mounted() {
    //@ts-ignore
    setInterval(this.updateData, refreshRateInMilliseconds);
  },
  methods: {
    updateData() {
      const options = cloneDeep(this.options);

      var now = Date.now();
      options.data = getData();

      this.options = options;
    },
  },
};

var systemLoad = 0;

var userLoad = 0;

var data = [];

var refreshRateInMilliseconds = 50;

var millisecondsOfData = 30 * 1000;

window.calculateRandomDelta = function calculateRandomDelta(maxChange) {
  return maxChange / 2 - Math.floor(Math.random() * Math.floor(maxChange + 1));
};

window.ensureBounds = function ensureBounds(load, max) {
  if (load > max) {
    return max;
  } else if (load < 0) {
    return 0;
  }
  return load;
};

window.calculateCpuUsage = function calculateCpuUsage() {
  systemLoad = ensureBounds(systemLoad + calculateRandomDelta(2), 30);
  userLoad = ensureBounds(userLoad + calculateRandomDelta(4), 70);
};

window.getData = function getData() {
  var dataCount = millisecondsOfData / refreshRateInMilliseconds;
  data.shift();
  var timeDelta = (dataCount - data.length - 1) * refreshRateInMilliseconds;
  var now = Date.now();
  while (data.length < dataCount) {
    calculateCpuUsage();
    data.push({ time: now - timeDelta, system: systemLoad, user: userLoad });
    timeDelta -= refreshRateInMilliseconds;
  }
  return data;
};

new Vue({
  el: "#app",
  components: {
    "my-component": ChartExample,
  },
});
