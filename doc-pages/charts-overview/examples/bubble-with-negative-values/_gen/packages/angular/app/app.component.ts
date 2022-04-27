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
        text: 'Most Populous Cities (2019)',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: Simple Maps',
      },
      series: [
        {
          type: 'scatter',
          title: 'Most populous cities',
          xKey: 'lon',
          xName: 'Longitude',
          yKey: 'lat',
          yName: 'Latitude',
          sizeKey: 'population',
          sizeName: 'Population',
          labelKey: 'city',
          labelName: 'City',
          marker: {
            size: 5,
            maxSize: 100,
          },
          fillOpacity: 0.5,
        },
      ],
      axes: [
        {
          position: 'bottom',
          type: 'number',
          title: {
            text: 'Longitude',
          },
          min: -180,
          max: 180,
          nice: false,
        },
        {
          position: 'left',
          type: 'number',
          title: {
            text: 'Latitude',
          },
          min: -90,
          max: 90,
          nice: false,
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }

  ngOnInit() {}
}
