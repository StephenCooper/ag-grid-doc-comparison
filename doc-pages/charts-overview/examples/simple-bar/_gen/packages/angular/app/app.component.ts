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
      autoSize: true,
      data: getData(),
      theme: {
        overrides: {
          bar: {
            series: {
              strokeWidth: 0,
            },
          },
        },
      },
      title: {
        text: "Gross Weekly Earnings by Occupation (Q4 2019)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Office for National Statistics",
      },
      series: [
        {
          type: "bar",
          xKey: "type",
          yKey: "earnings",
        },
      ],
      axes: [
        {
          type: "category",
          position: "left",
        },
        {
          type: "number",
          position: "bottom",
          title: {
            enabled: true,
            text: "£/week",
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
