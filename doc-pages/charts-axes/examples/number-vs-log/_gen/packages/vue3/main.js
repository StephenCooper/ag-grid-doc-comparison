import { AgChartsVue } from "ag-charts-vue3";
import { cloneDeep } from "lodash";
import { createApp } from "vue";

const ChartExample = {
  template: `
        <div class="wrapper">
                <div id="toolPanel">
                    <button v-on:click="useNumberAxis()">Number axis</button>
                    <span class="spacer"></span>
                    <button v-on:click="useLogAxis()">Base 10 log axis</button>
                    <span class="spacer"></span>
                    <button v-on:click="useBaseTwoLogAxis()">Base 2 log axis</button>
                    <span class="spacer"></span>
                    <button v-on:click="useLogAxisWithFewerTicks()">Log axis with fewer ticks (base 10)</button>
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
        { os: "A", share: 10 },
        { os: "B", share: 100 },
        { os: "C", share: 1000 },
      ],
      series: [
        {
          type: "line",
          xKey: "os",
          yKey: "share",
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
          label: {
            format: ".0f",
          },
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
    useNumberAxis() {
      const options = cloneDeep(this.options);

      options.axes = [
        {
          type: "category",
          position: "bottom",
        },
        {
          type: "number",
          position: "left",
          min: 1,
          label: {
            format: ".0f",
          },
          tick: {
            count: 10,
          },
        },
      ];

      this.options = options;
    },
    useLogAxis() {
      const options = cloneDeep(this.options);

      options.axes = [
        {
          type: "category",
          position: "bottom",
        },
        {
          type: "log",
          position: "left",
          min: 10,
          label: {
            format: ".0f",
          },
          tick: {
            count: 10,
          },
        },
      ];

      this.options = options;
    },
    useBaseTwoLogAxis() {
      const options = cloneDeep(this.options);

      options.axes = [
        {
          type: "category",
          position: "bottom",
        },
        {
          type: "log",
          position: "left",
          min: 10,
          label: {
            format: ".0f",
          },
          tick: {
            count: 10,
          },
          base: 2,
        },
      ];

      this.options = options;
    },
    useLogAxisWithFewerTicks() {
      const options = cloneDeep(this.options);

      options.axes = [
        {
          type: "category",
          position: "bottom",
        },
        {
          type: "log",
          position: "left",
          min: 10,
          label: {
            format: ".0f",
          },
          tick: {
            count: 2, // a hint that we want a smaller tick count
          },
        },
      ];

      this.options = options;
    },
  },
};

createApp(ChartExample).mount("#app");
