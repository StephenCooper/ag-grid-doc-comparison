import { Component } from "@angular/core";
import { AgChartOptions } from "ag-charts-community";

@Component({
  selector: "my-app",
  template: `<ag-charts-angular
    style="height: 100%"
    [options]="options"
  ></ag-charts-angular>`,
})
export class AppComponent {
  private options: AgChartOptions;

  constructor() {
    this.options = {
      title: {
        text: "Apple's revenue by product category",
      },
      subtitle: {
        text: "in billion U.S. dollars",
      },
      data: getData(),
      series: [
        {
          type: "column",
          xKey: "quarter",
          yKey: "iphone",
          yName: "iPhone",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "mac",
          yName: "Mac",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "ipad",
          yName: "iPad",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "wearables",
          yName: "Wearables",
          stacked: true,
        },
        {
          type: "column",
          xKey: "quarter",
          yKey: "services",
          yName: "Services",
          stacked: true,
        },
      ],
    };
  }

  ngOnInit() {}
}
