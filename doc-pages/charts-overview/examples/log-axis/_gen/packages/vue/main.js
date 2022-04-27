import { AgChartsVue } from 'ag-charts-vue';
import { cloneDeep } from 'lodash';
import Vue from 'vue';

const ChartExample = {
  template: `
        <div class="wrapper">
                <div id="toolPanel">
                    <button v-on:click="useNumberAxis()">Number axis</button>
                    <span class="spacer"></span>
                    <button v-on:click="useLogAxis()">Log axis</button>
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
      data: getData(),
      title: {
        text: 'World Population Over Time',
      },
      subtitle: {
        text: 'log scale',
      },
      series: [
        {
          type: 'line',
          xKey: 'year',
          yKey: 'population',
        },
      ],
      axes: [
        {
          type: 'log',
          position: 'left',
          title: {
            text: 'Population',
          },
          label: {
            format: ',.0f',
            fontSize: 10,
          },
        },
        {
          type: 'number',
          position: 'bottom',
          title: {
            text: 'Year',
          },
          label: {
            fontSize: 10,
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

      options.subtitle = {
        text: 'linear scale',
      };
      options.axes[0] = {
        type: 'number',
        position: 'left',
        title: {
          text: 'Population',
        },
        label: {
          format: ',.0f',
          fontSize: 10,
        },
      };

      this.options = options;
    },
    useLogAxis() {
      const options = cloneDeep(this.options);

      options.subtitle = {
        text: 'log scale',
      };
      options.axes[0] = {
        type: 'log',
        position: 'left',
        title: {
          text: 'Population',
        },
        label: {
          format: ',.0f',
          fontSize: 10,
        },
      };

      this.options = options;
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'my-component': ChartExample,
  },
});
