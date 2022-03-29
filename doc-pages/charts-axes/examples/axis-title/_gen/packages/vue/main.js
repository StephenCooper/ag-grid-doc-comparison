import { AgChartsVue } from "ag-charts-vue";
import { cloneDeep } from "lodash";
import Vue from "vue";

const ChartExample = {
  template: `
        <div class="wrapper">
                <div id="toolPanel">
                    <button v-on:click="showAxisTitles()">Show axis titles</button>
                    <span class="spacer"></span>
                    <button v-on:click="hideAxisTitles()">Hide axis titles</button>
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
        { os: "Windows", share: 88.07 },
        { os: "macOS", share: 9.44 },
        { os: "Linux", share: 1.87 },
      ],
      series: [
        {
          type: "column",
          xKey: "os",
          yKey: "share",
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          title: {
            text: "Desktop Operating Systems",
            enabled: false,
          },
        },
        {
          type: "number",
          position: "left",
          title: {
            text: "Market Share (%)",
            enabled: false,
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
    showAxisTitles() {
      const options = cloneDeep(this.options);

      options.axes[0].title.enabled = true;
      options.axes[1].title.enabled = true;

      this.options = options;
    },
    hideAxisTitles() {
      const options = cloneDeep(this.options);

      options.axes[0].title.enabled = false;
      options.axes[1].title.enabled = false;

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
