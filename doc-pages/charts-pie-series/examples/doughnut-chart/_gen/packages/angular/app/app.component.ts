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
      data: [
        { os: 'Android', share: 56.9 },
        { os: 'iOS', share: 22.5 },
        { os: 'BlackBerry', share: 6.8 },
        { os: 'Symbian', share: 8.5 },
        { os: 'Bada', share: 2.6 },
        { os: 'Windows', share: 1.9 },
      ],
      series: [
        {
          type: 'pie',
          labelKey: 'os',
          angleKey: 'share',
          innerRadiusOffset: -70,
        },
      ],
    };
  }

  ngOnInit() {}
}
