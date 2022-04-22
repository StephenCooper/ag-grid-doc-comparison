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
      autoSize: true,
      data: getData(),
      theme: {
        overrides: {
          area: {
            series: {
              fillOpacity: 0.8,
            },
          },
        },
      },
      title: {
        text: 'Total Visitors to Tate Galleries',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: Department for Digital, Culture, Media & Sport',
      },
      series: [
        {
          type: 'area',
          xKey: 'date',
          yKey: 'Tate Modern',
          fill: '#c16068',
          stroke: '#874349',
        },
        {
          type: 'area',
          xKey: 'date',
          yKey: 'Tate Britain',
          fill: '#a2bf8a',
          stroke: '#718661',
        },
        {
          type: 'area',
          xKey: 'date',
          yKey: 'Tate Liverpool',
          fill: '#ebcc87',
          stroke: '#a48f5f',
        },
        {
          type: 'area',
          xKey: 'date',
          yKey: 'Tate St Ives',
          fill: '#80a0c3',
          stroke: '#5a7088',
        },
      ],
      axes: [
        {
          type: 'time',
          position: 'bottom',
        },
        {
          type: 'number',
          position: 'left',
          title: {
            enabled: true,
            text: 'Total visitors',
          },
          label: {
            formatter: (params) => {
              return params.value / 1000 + 'k';
            },
          },
        },
      ],
      legend: {
        position: 'bottom',
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
