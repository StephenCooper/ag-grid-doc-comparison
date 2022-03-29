import { AgChartsVue } from "ag-charts-vue3";
import { cloneDeep } from "lodash";
import { createApp } from "vue";

const ChartExample = {
  template: `
        <div class="wrapper">
                <div class="toolPanel" style="padding-bottom: 15px">
                    <button v-on:click="applyTheme('ag-default')">Default Theme</button>
                    <button v-on:click="applyTheme('ag-default-dark')">Default Dark Theme</button>
                    <button v-on:click="applyTheme('ag-pastel-dark')">Pastel Dark Theme</button>
                    <button v-on:click="applyTheme('ag-vivid')">Vivid Theme</button>
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
      theme: "ag-default-dark",
      autoSize: true,
      padding: {
        left: 70,
        right: 70,
      },
      title: {
        text: "Chart Theme Example",
      },
      data: [
        { label: "Android", value: 56.9, other: 7 },
        { label: "iOS", value: 22.5, other: 8 },
        { label: "BlackBerry", value: 6.8, other: 9 },
        { label: "Symbian", value: 8.5, other: 10 },
        { label: "Bada", value: 2.6, other: 11 },
        { label: "Windows", value: 1.9, other: 12 },
      ],
      series: [
        {
          type: "pie",
          angleKey: "value",
          labelKey: "label",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    applyTheme(theme) {
      const options = cloneDeep(this.options);

      options.theme = theme;

      this.options = options;
    },
  },
};

createApp(ChartExample).mount("#app");
