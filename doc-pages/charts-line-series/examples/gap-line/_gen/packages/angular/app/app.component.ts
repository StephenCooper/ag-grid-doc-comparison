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
      data: getData(),
      title: {
        text: "People Born",
      },
      subtitle: {
        text: "2008-2020",
      },
      series: [
        {
          xKey: "year",
          yKey: "visitors",
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }

  ngOnInit() {}
}
