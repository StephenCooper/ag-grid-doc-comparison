import Vue from "vue";
import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community";
import { AgChartsVue } from "ag-charts-vue";

const ChartExample = {
  template: `
        <div class="wrapper">
                <div class="toolPanel">
                    <button v-on:click="toggleEnabled(true)">Show Navigator</button>
                    <button v-on:click="toggleEnabled(false)">Hide Navigator</button>
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
      title: {
        text: "Try dragging the Navigator's handles to zoom in",
      },
      subtitle: {
        text: "or the area between them to pan around",
      },
      data: [
        { label: "Android", value: 56.9 },
        { label: "iOS", value: 22.5 },
        { label: "BlackBerry", value: 6.8 },
        { label: "Symbian", value: 8.5 },
        { label: "Bada", value: 2.6 },
        { label: "Windows", value: 1.9 },
      ],
      series: [
        {
          type: "column",
          xKey: "label",
          yKey: "value",
        },
      ],
      axes: [
        {
          type: "number",
          position: "left",
        },
        {
          type: "category",
          position: "bottom",
        },
      ],
      legend: {
        enabled: false,
      },
      navigator: {
        enabled: true,
      },
    };
  },
  mounted() {},
  methods: {
    toggleEnabled(value) {
      const options = cloneDeep(this.options);

      options.navigator.enabled = value;

      this.options = options;
    },
  },
};

new Vue({
  el: "#app",
  components: {
    "my-component": ChartExample,
  },
});
