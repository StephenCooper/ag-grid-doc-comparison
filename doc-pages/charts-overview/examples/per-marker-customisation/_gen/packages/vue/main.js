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
      data: getData().filter((d) => {
        return d.magnitude > 4;
      }),
      title: {
        text: "Worldwide Earthquakes (first week of February 2020)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: US Geological Survey",
      },
      series: [
        {
          type: "scatter",
          xKey: "depth",
          xName: "Depth",
          yKey: "minDistance",
          yName: "Minimum Distance",
          sizeKey: "magnitude",
          sizeName: "Magnitude",
          marker: {
            size: minSize,
            maxSize: maxSize,
            formatter: function (params) {
              return {
                fill: params.highlighted
                  ? params.fill
                  : calculateColour(params.size),
              };
            },
            strokeWidth: 0,
          },
          fillOpacity: 0.7,
        },
      ],
      axes: [
        {
          position: "bottom",
          type: "number",
          title: {
            enabled: true,
            text: "Depth (m)",
          },
        },
        {
          position: "left",
          type: "number",
          title: {
            enabled: true,
            text: "Minimum distance (km)",
          },
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

var minSize = 5;

var maxSize = 100;

window.find = function find(arr, predicate) {
  for (var i = 0, ln = arr.length; i < ln; i++) {
    var value = arr[i];
    if (predicate(value, i, arr)) {
      return value;
    }
  }
};

window.calculateColour = function calculateColour(size) {
  var colours = {
    0.1: "#33CC00",
    0.2: "#5CC200",
    0.3: "#85B800",
    0.4: "#ADAD00",
    0.5: "#D6A300",
    0.6: "#FF9900",
    0.7: "#FF7300",
    0.8: "#FF4D00",
    0.9: "#FF2600",
    1: "#FF0000",
  };
  var position = (size - minSize) / (maxSize - minSize);
  var keys = Object.keys(colours)
    .map(function (key) {
      return parseFloat(key);
    })
    .sort();
  var matchingKey = find(keys, function (key) {
    return key > position;
  });
  return colours[matchingKey];
};

new Vue({
  el: "#app",
  components: {
    "my-component": ChartExample,
  },
});
