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
        text: 'Race demographics',
      },
      subtitle: {
        text: 'Number of participants by age',
      },
      data: getData(),
      series: [
        {
          type: 'histogram',
          xKey: 'age',
          xName: 'Participant Age',
          binCount: 20,
        },
      ],
      legend: {
        enabled: false,
      },
      axes: [
        {
          type: 'number',
          position: 'bottom',
          title: { text: 'Age (years)' },
        },
        {
          type: 'number',
          position: 'left',
          title: { text: 'Number of participants' },
        },
      ],
    };
  }

  ngOnInit() {}
}
