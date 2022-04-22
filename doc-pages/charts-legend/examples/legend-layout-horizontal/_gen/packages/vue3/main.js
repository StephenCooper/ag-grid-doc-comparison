import { AgChartsVue } from 'ag-charts-vue3';
import { cloneDeep } from 'lodash';
import { createApp } from 'vue';

const ChartExample = {
  template: `
        <div class="wrapper">
                <div id="toolPanel">
                    <div class="slider">
                        <label for="sliderInput"><strong>Width:</strong></label>
                        <span id="sliderValue">750</span>
                        <input type="range" id="sliderInput" min="350" max="750" value="750" v-on:input="updateWidth($event)" v-on:change="updateWidth($event)">
                    </div>
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
      autoSize: false,
      width: 750,
      height: 430,
      data: [
        { label: 'USA', value: 56.9 },
        { label: 'UK', value: 22.5 },
        { label: 'China', value: 6.8 },
        { label: 'Russia', value: 8.5 },
        { label: 'India', value: 2.6 },
        { label: 'Germany', value: 18.2 },
        { label: 'France', value: 12.5 },
        { label: 'Canada', value: 3.9 },
        { label: 'Spain', value: 7.9 },
        { label: 'South Africa', value: 21.9 },
        { label: 'Portugal', value: 7.4 },
        { label: 'Netherlands', value: 4.7 },
        { label: 'Finland', value: 3.9 },
        { label: 'Sweden', value: 3.3 },
        { label: 'Norway', value: 3.2 },
        { label: 'Greece', value: 1.9 },
        { label: 'Italy', value: 2.5 },
      ],
      series: [
        {
          type: 'pie',
          angleKey: 'value',
          labelKey: 'label',
          strokeWidth: 3,
        },
      ],
      legend: {
        position: 'bottom',
      },
    };
  },
  mounted() {},
  methods: {
    updateWidth(event) {
      const options = cloneDeep(this.options);

      var value = +event.target.value;
      options.width = value;

      document.getElementById('sliderValue').innerHTML = String(value);

      this.options = options;
    },
  },
};

createApp(ChartExample).mount('#app');
