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
      data: getData().filter(function (d) {
        return d.magnitude > 4;
      }),
      title: {
        text: "Worldwide Earthquakes (first week of February 2020)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: US Geological Survey",
      },
      series: [
        {
          type: "scatter",
          xKey: "depth",
          xName: "Depth",
          yKey: "magnitude",
          yName: "Magnitude",
          sizeKey: "minDistance",
          sizeName: "Minimum Distance",
          marker: {
            size: 5,
            maxSize: 100,
            fill: "#41874b",
            stroke: "#41874b",
          },
          fillOpacity: 0.5,
        },
      ],
      axes: [
        {
          position: "bottom",
          type: "number",
          title: {
            enabled: true,
            text: "Depth (m)",
          },
        },
        {
          position: "left",
          type: "number",
          title: {
            enabled: true,
            text: "Magnitude",
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }

  ngOnInit() {}
}
