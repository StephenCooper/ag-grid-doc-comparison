import { Component } from '@angular/core';
import {
  AgCartesianSeriesTooltipRendererParams,
  AgChartOptions,
} from 'ag-charts-community';

@Component({
  selector: 'my-app',
  template: `<ag-charts-angular
    style="height: 100%"
    [options]="options"
  ></ag-charts-angular>`,
})
export class AppComponent {
  private options: AgChartOptions;

  constructor() {
    this.options = {
      data: [
        {
          month: 'Dec',
          sweaters: 50,
          hats: 40,
        },
        {
          month: 'Jan',
          sweaters: 70,
          hats: 50,
        },
        {
          month: 'Feb',
          sweaters: 60,
          hats: 30,
        },
      ],
      series: [
        {
          type: 'column',
          xKey: 'month',
          tooltip: { renderer: renderer },
          yKey: 'sweaters',
          yName: 'Sweaters made',
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          tooltip: { renderer: renderer },
          yKey: 'hats',
          yName: 'Hats made',
          stacked: true,
        },
      ],
    };
  }

  ngOnInit() {}
}

function renderer(params: AgCartesianSeriesTooltipRendererParams) {
  return (
    '<div class="ag-chart-tooltip-title" style="background-color:' +
    params.color +
    '">' +
    params.xValue +
    '</div>' +
    '<div class="ag-chart-tooltip-content">' +
    params.yValue.toFixed(0) +
    '</div>'
  );
}
