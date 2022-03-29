import { Component } from "@angular/core";
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
      title: {
        text: "Mean Sea Level (mm)",
      },

      data: getData(),
      series: [
        {
          type: "scatter",
          xKey: "time",
          yKey: "mm",
          showInLegend: false,
        },
      ],
      axes: [
        {
          type: "number",
          position: "bottom",
        },
        {
          type: "number",
          position: "left",
        },
      ],
    };
  }

  ngOnInit() {}
}
