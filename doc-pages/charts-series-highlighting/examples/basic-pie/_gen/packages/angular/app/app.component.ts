import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';

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
      data: data,

      title: {
        text: 'Beverage Expenses',
      },
      subtitle: {
        text: 'per quarter',
      },
      series: [
        {
          type: 'pie',
          title: {
            text: 'Q1',
            showInLegend: true,
          },
          label: {
            enabled: false,
          },
          angleKey: 'Q1',
          labelKey: 'beverage',
          showInLegend: true,
          outerRadiusOffset: 0,
          innerRadiusOffset: -20,
          highlightStyle,
        },
        {
          type: 'pie',
          title: {
            text: 'Q2',
            showInLegend: true,
          },
          label: {
            enabled: false,
          },
          angleKey: 'Q2',
          labelKey: 'beverage',
          outerRadiusOffset: -40,
          innerRadiusOffset: -60,
          highlightStyle,
        },
        {
          type: 'pie',
          title: {
            text: 'Q3',
            showInLegend: true,
          },
          label: {
            enabled: false,
          },
          angleKey: 'Q3',
          labelKey: 'beverage',
          outerRadiusOffset: -80,
          innerRadiusOffset: -100,
          highlightStyle,
        },
        {
          type: 'pie',
          title: {
            text: 'Q4',
            showInLegend: true,
          },
          label: {
            enabled: false,
          },
          angleKey: 'Q4',
          labelKey: 'beverage',
          outerRadiusOffset: -120,
          innerRadiusOffset: -140,
          highlightStyle,
        },
      ],
    };
  }

  ngOnInit() {}
}

const data = [
  {
    beverage: 'Coffee',
    Q1: 450,
    Q2: 560,
    Q3: 600,
    Q4: 700,
  },
  {
    beverage: 'Tea',
    Q1: 270,
    Q2: 380,
    Q3: 450,
    Q4: 520,
  },
  {
    beverage: 'Milk',
    Q1: 180,
    Q2: 170,
    Q3: 190,
    Q4: 200,
  },
];
const highlightStyle = {
  item: {
    fill: 'red',
    stroke: 'maroon',
    strokeWidth: 4,
  },
  series: {
    dimOpacity: 0.2,
    strokeWidth: 2,
  },
};
