import { AgChartsVue } from 'ag-charts-vue';
import { cloneDeep } from 'lodash';
import Vue from 'vue';

const ChartExample = {
  template: `
        <div class="wrapper">
                <div id="toolPanel">
                    <button v-on:click="reverseSeries()">Reverse Series</button>
                    <span class="spacer"></span>
                    <button v-on:click="swapTitles()">Swap Titles</button>
                    <span class="spacer"></span>
                    <button v-on:click="rotateLegend()">Rotate Legend</button>
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
      title: {
        text: 'Browser Usage Statistics',
      },
      subtitle: {
        text: '2009-2019',
      },
      data: getData(),
      series,
      legend,
    };
  },
  mounted() {},
  methods: {
    reverseSeries() {
      const options = cloneDeep(this.options);

      // Mutate options.
      options.series = series.reverse();
      // Apply changes.

      this.options = options;
    },
    swapTitles() {
      const options = cloneDeep(this.options);

      // Mutate options.
      const oldTitle = options.title;
      options.title = options.subtitle;
      options.subtitle = oldTitle;
      // Apply changes.

      this.options = options;
    },
    rotateLegend() {
      const options = cloneDeep(this.options);

      // Mutate legend.
      const currentIdx = positions.indexOf(legend.position || 'top');
      legend.position = positions[(currentIdx + 1) % positions.length];
      // Apply changes.
      options.legend = legend;

      this.options = options;
    },
  },
};

window.buildSeries = function buildSeries(name) {
  return {
    type: 'area',
    xKey: 'year',
    yKey: name.toLowerCase(),
    yName: name,
    fillOpacity: 0.5,
  };
};

const series = [
  buildSeries('IE'),
  buildSeries('Chrome'),
  buildSeries('Firefox'),
  buildSeries('Safari'),
];

const positions = ['left', 'top', 'right', 'bottom'];

const legend = {
  position: positions[1],
};

new Vue({
  el: '#app',
  components: {
    'my-component': ChartExample,
  },
});
