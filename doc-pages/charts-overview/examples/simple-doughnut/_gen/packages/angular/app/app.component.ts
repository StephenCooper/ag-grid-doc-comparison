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
      title: {
        text: "Dwelling Fires (UK)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Home Office",
      },
      series: [
        {
          type: "pie",
          labelKey: "type",
          fillOpacity: 0.9,
          strokeWidth: 0,
          angleKey: "2018/19",
          label: {
            enabled: false,
          },
          title: {
            enabled: true,
            text: "2018/19",
          },
          innerRadiusOffset: -100,
        },
      ],
    };
  }

  ngOnInit() {}
}
