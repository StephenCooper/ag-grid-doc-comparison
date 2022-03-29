import Vue from "vue";
import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community";
import { AgChartsVue } from "ag-charts-vue";

const ChartExample = {
  template: `
        <div class="wrapper">
                <div class="toolPanel">
                    <button v-on:click="setLegendEnabled(true)">Show Legend</button>
                    <span class="spacer"></span>
                    <button v-on:click="setLegendEnabled(false)">Hide Legend</button>
                    <span class="spacer"></span>
                    <div class="button-group">
                        Legend Position:
                        <span class="spacer"></span>
                        <button class="button--code" v-on:click="updateLegendPosition('right')">'right'</button>
                        <span class="spacer"></span>
                        <button class="button--code" v-on:click="updateLegendPosition('bottom')">'bottom'</button>
                        <span class="spacer"></span>
                        <button class="button--code" v-on:click="updateLegendPosition('left')">'left'</button>
                        <span class="spacer"></span>
                        <button class="button--code" v-on:click="updateLegendPosition('top')">'top'</button>
                    </div>
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
          type: "pie",
          angleKey: "value",
          labelKey: "label",
          strokeWidth: 3,
        },
      ],
      legend: {
        position: "right",
      },
    };
  },
  mounted() {},
  methods: {
    updateLegendPosition(value) {
      const options = cloneDeep(this.options);

      options.legend.position = value;

      this.options = options;
    },
    setLegendEnabled(enabled) {
      const options = cloneDeep(this.options);

      options.legend.enabled = enabled;

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
