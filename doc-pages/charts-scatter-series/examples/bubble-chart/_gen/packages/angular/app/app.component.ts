import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
declare var maleHeightWeight: any[];
declare var femaleHeightWeight: any[];

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
      title: {
        text: 'Weight vs Height',
      },
      subtitle: {
        text: 'by gender',
      },
      series: [
        {
          type: 'scatter',
          title: 'Male',
          data: maleHeightWeight,
          xKey: 'height',
          xName: 'Height',
          yKey: 'weight',
          yName: 'Weight',
          sizeKey: 'age',
          sizeName: 'Age',
          marker: {
            shape: 'square',
            size: 6,
            maxSize: 30,
            fill: 'rgba(227,111,106,0.71)',
            stroke: '#9f4e4a',
          },
        },
        {
          type: 'scatter',
          title: 'Female',
          data: femaleHeightWeight,
          xKey: 'height',
          xName: 'Height',
          yKey: 'weight',
          yName: 'Weight',
          sizeKey: 'age',
          sizeName: 'Age',
          marker: {
            size: 6,
            maxSize: 30,
            fill: 'rgba(123,145,222,0.71)',
            stroke: '#56659b',
          },
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'bottom',
          title: {
            enabled: true,
            text: 'Height',
          },
          label: {
            rotation: 45,
            formatter: (params) => {
              return params.value + 'cm';
            },
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            enabled: true,
            text: 'Weight',
          },
          label: {
            formatter: (params) => {
              return params.value + 'kg';
            },
          },
        },
      ],
    };
  }

  ngOnInit() {}
}
