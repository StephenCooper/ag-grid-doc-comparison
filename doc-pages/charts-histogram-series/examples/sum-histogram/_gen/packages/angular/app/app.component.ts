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
      title: {
        text: "Prize money distribution",
      },
      subtitle: {
        text: "Total winnings by participant age",
      },
      data: getData(),
      series: [
        {
          type: "histogram",
          xKey: "age",
          xName: "Participant Age",
          yKey: "winnings",
          yName: "Winnings",
          aggregation: "sum",
        },
      ],
      legend: {
        enabled: false,
      },
      axes: [
        {
          type: "number",
          position: "bottom",
          title: { text: "Age band (years)" },
        },
        {
          type: "number",
          position: "left",
          title: { text: "Total winnings (USD)" },
        },
      ],
      height: 550,
    };
  }

  ngOnInit() {}
}
