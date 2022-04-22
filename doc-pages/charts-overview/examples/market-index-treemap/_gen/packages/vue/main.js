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
      type: 'hierarchy',

      data,
      series: [
        {
          type: 'treemap',
          labelKey: 'name',
          sizeKey: 'size',
          colorKey: 'color',
          tooltip: {
            renderer: tooltipRenderer,
          },
        },
      ],
      title: {
        text: 'S&P 500 index stocks categorized by sectors and industries.',
      },
      subtitle: {
        text:
          'Area represents market cap. Color represents change from the day before.',
      },
    };
  },
  mounted() {},
  methods: {},
};

window.tooltipRenderer = function tooltipRenderer(params) {
  const { datum } = params;
  const customRootText = 'Custom Root Text';
  const title = datum.parent
    ? datum.parent.depth
      ? datum.parent.datum[params.labelKey]
      : customRootText
    : customRootText;
  let content = '<div>';
  let ellipsis = false;
  if (datum.parent) {
    const maxCount = 5;
    ellipsis = datum.parent.children.length > maxCount;
    datum.parent.children.slice(0, maxCount).forEach((child) => {
      content += `<div style="font-weight: bold; color: white; background-color: ${
        child.fill
      }; padding: 5px;"><strong>${
        child.datum.name || child.label
      }</strong>: ${String(
        isFinite(child.colorValue) ? child.colorValue.toFixed(2) : ''
      )}%</div>`;
    });
  }
  if (ellipsis) {
    content += `<div style="text-align: center;">...</div>`;
  }
  content += '</div>';
  return {
    title,
    content,
    backgroundColor: 'gray',
  };
};

new Vue({
  el: '#app',
  components: {
    'my-component': ChartExample,
  },
});
