import { AgChartsVue } from 'ag-charts-vue';
import Vue from 'vue';

const ChartExample = {
  template: `
        <ag-charts-vue    
                :options="options"></ag-charts-vue>
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
        text: "Apple's revenue by product category",
      },
      subtitle: {
        text: 'in billion U.S. dollars',
      },
      data: getData(),
      series: [
        {
          type: 'column',
          xKey: 'quarter',
          yKey: 'iphone',
          yName: 'iPhone',
          stacked: true,
          label: { formatter },
        },
        {
          type: 'column',
          xKey: 'quarter',
          yKey: 'mac',
          yName: 'Mac',
          stacked: true,
          label: { formatter },
        },
        {
          type: 'column',
          xKey: 'quarter',
          yKey: 'ipad',
          yName: 'iPad',
          stacked: true,
          label: { formatter },
        },
        {
          type: 'column',
          xKey: 'quarter',
          yKey: 'wearables',
          yName: 'Wearables',
          stacked: true,
          label: { formatter },
        },
        {
          type: 'column',
          xKey: 'quarter',
          yKey: 'services',
          yName: 'Services',
          stacked: true,
          label: { formatter },
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};

const formatter = ({ value }) => (value == null ? '' : value.toFixed(0));

new Vue({
  el: '#app',
  components: {
    'my-component': ChartExample,
  },
});
