import { Component } from '@angular/core';
import {
  AgChartOptions,
  AgTreemapSeriesTooltipRendererParams,
} from 'ag-charts-community';
declare var data: any;

@Component({
  selector: 'my-app',
  template: `<ag-charts-angular
    style="height: 100%"
    [options]="options"
  ></ag-charts-angular> `,
})
export class AppComponent {
  private options: AgChartOptions;

  constructor() {
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
  }

  ngOnInit() {}
}

function tooltipRenderer(params: AgTreemapSeriesTooltipRendererParams) {
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
    ellipsis = datum.parent.children!.length > maxCount;
    datum.parent.children!.slice(0, maxCount).forEach((child) => {
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
}
