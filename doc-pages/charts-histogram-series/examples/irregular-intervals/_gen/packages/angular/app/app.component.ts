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
        text: "Race demographics",
      },
      subtitle: {
        text: "Number of participants by age category",
      },
      data: getData(),
      series: [
        {
          type: "histogram",
          xKey: "age",
          xName: "Participant Age",
          areaPlot: true,
          bins: [
            [16, 18],
            [18, 21],
            [21, 25],
            [25, 40],
          ],
        },
      ],
      legend: {
        enabled: false,
      },
      axes: [
        {
          type: "number",
          position: "bottom",
          title: { text: "Age category (years)" },
        },
        {
          type: "number",
          position: "left",
          title: { text: "Number of participants" },
        },
      ],
    };
  }

  ngOnInit() {}
}
