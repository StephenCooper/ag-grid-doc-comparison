import { AgChartsVue } from "ag-charts-vue3";
import { createApp } from "vue";

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
      data: [
        {
          month: "Jun",
          sweaters: 50,
        },
        {
          month: "Jul",
          sweaters: 70,
        },
        {
          month: "Aug",
          sweaters: 60,
        },
      ],
      series: [
        {
          type: "column",
          xKey: "month",
          yKey: "sweaters",
          yName: "Sweaters Made",
        },
      ],
      tooltip: {
        class: "my-tooltip",
      },
    };
  },
  mounted() {},
  methods: {},
};

createApp(ChartExample).mount("#app");
