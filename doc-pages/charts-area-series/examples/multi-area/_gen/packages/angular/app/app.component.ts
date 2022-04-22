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
      theme: {
        palette: {
          fills: ['#f3622d', '#41a9c9'],
          strokes: ['#aa4520', '#2d768d'],
        },
      },
      title: {
        text: 'Microsoft Internet Explorer vs Google Chrome',
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
          fillOpacity: 0.7,
          marker: {
            enabled: true,
          },
        },
        {
          type: 'area',
          xKey: 'year',
          yKey: 'chrome',
          yName: 'Chrome',
          fillOpacity: 0.7,
          marker: {
            enabled: true,
          },
        },
      ],
      legend: {
        position: 'top',
      },
    };
  }

  ngOnInit() {}
}
