import { cloneDeep } from "lodash";
import { Component } from "@angular/core";
import * as agCharts from "ag-charts-community";
import { AgChartOptions } from "ag-charts-community";

@Component({
  selector: "my-app",
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
        text: "Fuel Spending (2019)",
      },
      data: [
        {
          quarter: "Q1",
          petrol: 200,
          electric: 50,
        },
        {
          quarter: "Q2",
          petrol: 300,
          electric: 60,
        },
        {
          quarter: "Q3",
          petrol: 350,
          electric: 70,
        },
        {
          quarter: "Q4",
          petrol: 400,
          electric: 50,
        },
      ],
      series: [
        {
          type: "area",
          xKey: "quarter",
          yKey: "petrol",
          yName: "Petrol",
          stacked: true,
          marker: { formatter },
        },
        {
          type: "area",
          xKey: "quarter",
          yKey: "electric",
          yName: "Electric",
          stacked: true,
          marker: { formatter },
        },
      ],
    };
  }

  ngOnInit() {}
}

function formatter({ yKey, size }: { yKey: string; size: number }) {
  return { size: yKey === "electric" ? 12 : size };
}
