import { AgChartsVue } from 'ag-charts-vue';
import Vue from 'vue';

const ChartExample = {
  template: `
        <div class="wrapper">
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
        { os: 'Windows', share: 88.07 },
        { os: 'macOS', share: 9.44 },
        { os: 'Linux', share: 1.87 },
      ],
      series: [
        {
          type: 'column',
          xKey: 'os',
          yKey: 'share',
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Desktop Operating Systems',
            enabled: false,
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Market Share (%)',
            enabled: false,
          },
          label: {
            formatter: (params) => {
              return params.value + '%';
            },
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };
  },
  mounted() {},
  methods: {},
};

new Vue({
  el: '#app',
  components: {
    'my-component': ChartExample,
  },
});
