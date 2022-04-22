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
      autoSize: true,
      data: getData(),
      title: {
        text: 'Engine size distribution (USA 1987)',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: UCI',
      },
      series: [
        {
          type: 'histogram',
          xKey: 'engine-size',
          xName: 'Engine Size',
          fillOpacity: 0.5,
        },
      ],
      axes: [
        {
          position: 'bottom',
          type: 'number',
          title: {
            enabled: true,
            text: 'Engine Size (Cubic inches)',
          },
        },
        {
          position: 'left',
          type: 'number',
          title: {
            enabled: true,
            text: 'Frequency',
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
