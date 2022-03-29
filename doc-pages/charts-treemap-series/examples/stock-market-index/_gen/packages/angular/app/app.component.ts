import { Component } from "@angular/core";
import { AgChartOptions } from "ag-charts-community";
declare var data: any;

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
      type: "hierarchy",

      data,
      series: [
        {
          type: "treemap",
          labelKey: "name",
          sizeKey: "size",
          colorKey: "color",
          tooltip: {
            renderer: (params) => {
              return {
                content: `<b>Change</b>: ${params.datum.colorValue.toFixed(
                  2
                )}%`,
              };
            },
          },
        },
      ],
      title: {
        text: "S&P 500 index stocks categorized by sectors and industries.",
      },
      subtitle: {
        text: "Area represents market cap. Color represents change from the day before.",
      },
    };
  }

  ngOnInit() {}
}
