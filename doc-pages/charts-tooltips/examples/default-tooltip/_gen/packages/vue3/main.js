import { AgChartsVue } from 'ag-charts-vue3';
import { cloneDeep } from 'lodash';
import { createApp } from 'vue';

const ChartExample = {
  template: `
        <div class="wrapper">
                <div id="toolPanel">
                    <button v-on:click="setYNames()">Set yNames</button>
                    <span class="spacer"></span>
                    <button v-on:click="resetYNames()">Reset yNames</button>
                    <span class="spacer"></span>
                </div>
                <ag-charts-vue
                :options="options"></ag-charts-vue>
            </div>
    `,
  components: {
    'ag-charts-vue': AgChartsVue,
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
          month: 'Jun',
          value1: 50,
          hats_made: 40,
        },
        {
          month: 'Jul',
          value1: 70,
          hats_made: 50,
        },
        {
          month: 'Aug',
          value1: 60,
          hats_made: 30,
        },
      ],
      series: [
        { type: 'column', xKey: 'month', stacked: true, yKey: 'value1' },
        { type: 'column', xKey: 'month', stacked: true, yKey: 'hats_made' },
      ],
    };
  },
  mounted() {},
  methods: {
    setYNames() {
      const options = cloneDeep(this.options);

      options.series[0].yName = 'Sweaters Made';
      options.series[1].yName = 'Hats Made';

      this.options = options;
    },
    resetYNames() {
      const options = cloneDeep(this.options);

      options.series[0].yName = undefined;
      options.series[1].yName = undefined;
      this.options = options;
    },
  },
};

createApp(ChartExample).mount('#app');
