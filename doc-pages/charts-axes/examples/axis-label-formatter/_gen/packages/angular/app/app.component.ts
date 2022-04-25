import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'my-app',
  template: `<div class="wrapper">
    <ag-charts-angular
      style="height: 100%"
      [options]="options"
    ></ag-charts-angular>
  </div>`,
})
export class AppComponent {
  private options: AgChartOptions;

  constructor() {
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
  }

  ngOnInit() {}
}
