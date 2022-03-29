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
      data: [
        { label: "Android", value: 56.9 },
        { label: "iOS", value: 22.5 },
        { label: "BlackBerry", value: 6.8 },
        { label: "Symbian", value: 8.5 },
        { label: "Bada", value: 2.6 },
        { label: "Windows", value: 1.9 },
      ],
      series: [
        {
          type: "pie",
          angleKey: "value",
          labelKey: "label",
        },
      ],
    };
  }

  ngOnInit() {}
}
