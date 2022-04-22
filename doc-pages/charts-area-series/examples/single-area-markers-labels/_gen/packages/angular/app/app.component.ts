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
        text: 'Internet Explorer Market Share',
      },
      subtitle: {
        text: '2009-2019 (aka "good times")',
      },
      data: getData(),
      series: [
        {
          type: 'area',
          xKey: 'year',
          yKey: 'ie',
          yName: 'IE',
          marker: {
            enabled: true,
          },
          label: {
            enabled: true,
            fontWeight: 'bold',
          },
          tooltip: {
            renderer: (params) => {
              return {
                content: `${params.xValue}: ${params.yValue.toFixed(1)}%`,
              };
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
