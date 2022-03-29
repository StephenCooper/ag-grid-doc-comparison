import { Component } from "@angular/core";
import { AgCartesianChartOptions } from "ag-charts-community";
import { cloneDeep } from "lodash";

@Component({
  selector: "my-app",
  template: `<div class="wrapper">
    <div id="toolPanel">
      <button (click)="showAxisTitles()">Show axis titles</button>
      <span class="spacer"></span>
      <button (click)="hideAxisTitles()">Hide axis titles</button>
    </div>
    <ag-charts-angular
      style="height: 100%"
      [options]="options"
    ></ag-charts-angular>
  </div>`,
})
export class AppComponent {
  private options: AgCartesianChartOptions;

  constructor() {
    this.options = {
      data: [
        { os: "Windows", share: 88.07 },
        { os: "macOS", share: 9.44 },
        { os: "Linux", share: 1.87 },
      ],
      series: [
        {
          type: "column",
          xKey: "os",
          yKey: "share",
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          title: {
            text: "Desktop Operating Systems",
            enabled: false,
          },
        },
        {
          type: "number",
          position: "left",
          title: {
            text: "Market Share (%)",
            enabled: false,
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }

  ngOnInit() {}

  showAxisTitles = () => {
    const options = cloneDeep(this.options);

    options.axes![0].title!.enabled = true;
    options.axes![1].title!.enabled = true;

    this.options = options;
  };

  hideAxisTitles = () => {
    const options = cloneDeep(this.options);

    options.axes![0].title!.enabled = false;
    options.axes![1].title!.enabled = false;

    this.options = options;
  };
}
