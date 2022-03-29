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
        text: "Internet Explorer Market Share",
      },
      subtitle: {
        text: '2009-2019 (aka "good times")',
      },
      data: getData(),
      series: [
        {
          type: "area",
          xKey: "year",
          yKey: "ie",
          yName: "IE",
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }

  ngOnInit() {}
}
