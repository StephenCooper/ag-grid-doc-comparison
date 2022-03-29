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
        palette: {
          fills: ["#19A0AA", "#F15F36"],
          strokes: ["#19A0AA", "#F15F36"],
        },
        overrides: {
          column: {
            series: {
              highlightStyle: {
                series: {
                  dimOpacity: 0.3,
                },
              },
            },
          },
        },
      },
      title: {
        text: "Changes in Prison Population (2019)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Ministry of Justice, HM Prison Service, and Her Majesty’s Prison and Probation Service",
      },
      series: [
        {
          type: "column",
          xKey: "month",
          yKey: "menDelta",
          yName: "Male",
        },
        {
          type: "column",
          xKey: "month",
          yKey: "womenDelta",
          yName: "Female",
        },
      ],
      axes: [
        {
          type: "category",
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
