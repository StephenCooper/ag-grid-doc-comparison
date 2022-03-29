import { createApp } from "vue";
import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community";
import { AgChartsVue } from "ag-charts-vue3";

const ChartExample = {
  template: `
        <div class="wrapper">
                <div class="toolPanel">
                    <div class="slider">
                        <label for="xPaddingLabel"><strong>item.paddingX:</strong></label>
                        <span id="xPaddingValue" class="slider-value">32</span>
                        <input type="range" id="xPaddingLabel" min="0" max="50" v-on:input="updateLegendItemPaddingX($event)" v-on:change="updateLegendItemPaddingX($event)">
                    </div>
                </div>
                <div class="toolPanel">
                    <div class="slider">
                        <label for="yPaddingLabel"><strong>item.paddingY:</strong></label>
                        <span id="yPaddingValue" class="slider-value">8</span>
                        <input type="range" id="yPaddingLabel" min="0" max="30" v-on:input="updateLegendItemPaddingY($event)" v-on:change="updateLegendItemPaddingY($event)">
                    </div>
                </div>
                <div class="toolPanel">
                    <div class="slider">
                        <label for="markerPaddingLabel"><strong>item.marker.padding:</strong></label>
                        <span id="markerPaddingValue" class="slider-value">8</span>
                        <input type="range" id="markerPaddingLabel" min="0" max="30" v-on:input="updateLegendItemSpacing($event)" v-on:change="updateLegendItemSpacing($event)">
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
        { label: "USA", value: 56.9 },
        { label: "UK", value: 22.5 },
        { label: "China", value: 6.8 },
        { label: "Russia", value: 8.5 },
        { label: "India", value: 2.6 },
        { label: "Germany", value: 18.2 },
        { label: "France", value: 12.5 },
        { label: "Canada", value: 3.9 },
        { label: "Spain", value: 7.9 },
        { label: "South Africa", value: 21.9 },
        { label: "Portugal", value: 7.4 },
        { label: "Netherlands", value: 4.7 },
        { label: "Finland", value: 3.9 },
        { label: "Sweden", value: 3.3 },
        { label: "Norway", value: 3.2 },
        { label: "Greece", value: 1.9 },
        { label: "Italy", value: 2.5 },
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
        position: "bottom",
        item: {
          paddingX: 32,
          paddingY: 8,
          marker: {
            padding: 8,
          },
        },
      },
    };
  },
  mounted() {},
  methods: {
    updateLegendItemPaddingX(event) {
      const options = cloneDeep(this.options);

      var value = +event.target.value;
      options.legend.item.paddingX = value;

      document.getElementById("xPaddingValue").innerHTML = String(value);

      this.options = options;
    },
    updateLegendItemPaddingY(event) {
      const options = cloneDeep(this.options);

      var value = event.target.value;
      options.legend.item.paddingY = +event.target.value;

      document.getElementById("yPaddingValue").innerHTML = String(value);

      this.options = options;
    },
    updateLegendItemSpacing(event) {
      const options = cloneDeep(this.options);

      var value = +event.target.value;
      options.legend.item.marker.padding = value;

      document.getElementById("markerPaddingValue").innerHTML = String(value);

      this.options = options;
    },
  },
};

createApp(ChartExample).mount("#app");
