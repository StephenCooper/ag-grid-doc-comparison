import { cloneDeep } from "lodash";
import { Component } from "@angular/core";
import * as agCharts from "ag-charts-community";
import { AgChartOptions, AgChartTheme } from "ag-charts-community";

@Component({
  selector: "my-app",
  template: `<div class="wrapper">
    <div class="toolPanel" style="padding-bottom: 15px">
      <button (click)="applyTheme('ag-default')">Default Theme</button>
      <button (click)="applyTheme('ag-default-dark')">
        Default Dark Theme
      </button>
      <button (click)="applyTheme('ag-pastel-dark')">Pastel Dark Theme</button>
      <button (click)="applyTheme('ag-vivid')">Vivid Theme</button>
    </div>
    <ag-charts-angular
      style="height: 100%"
      [options]="options"
    ></ag-charts-angular>
  </div>`,
})
export class AppComponent {
  private options: AgChartOptions;

  constructor() {
    this.options = {
      theme: "ag-default-dark",
      autoSize: true,
      padding: {
        left: 70,
        right: 70,
      },
      title: {
        text: "Chart Theme Example",
      },
      data: [
        { label: "Android", value: 56.9, other: 7 },
        { label: "iOS", value: 22.5, other: 8 },
        { label: "BlackBerry", value: 6.8, other: 9 },
        { label: "Symbian", value: 8.5, other: 10 },
        { label: "Bada", value: 2.6, other: 11 },
        { label: "Windows", value: 1.9, other: 12 },
      ],
      series: [
        {
          type: "pie",
          angleKey: "value",
          labelKey: "label",
        },
      ],
    };
  }

  ngOnInit() {}

  applyTheme = (theme: AgChartTheme) => {
    const options = cloneDeep(this.options);

    options.theme = theme;

    this.options = options;
  };
}
