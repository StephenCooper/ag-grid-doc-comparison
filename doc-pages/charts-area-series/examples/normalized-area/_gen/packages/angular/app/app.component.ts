import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';

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
      title: {
        text: 'Browser Wars',
      },
      subtitle: {
        text: '2009-2019',
      },
      data: getData(),
      series: [
        {
          type: 'area',
          xKey: 'year',
          yKey: 'ie',
          yName: 'IE',
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'area',
          xKey: 'year',
          yKey: 'firefox',
          yName: 'Firefox',
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'area',
          xKey: 'year',
          yKey: 'safari',
          yName: 'Safari',
          normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'area',
          xKey: 'year',
          yKey: 'chrome',
          yName: 'Chrome',
          normalizedTo: 100,
          stacked: true,
        },
      ],
    };
  }

  ngOnInit() {}
}
