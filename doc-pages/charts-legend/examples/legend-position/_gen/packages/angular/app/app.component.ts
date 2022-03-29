import { Component } from "@angular/core";
import { AgChartLegendPosition, AgChartOptions } from "ag-charts-community";
import { cloneDeep } from "lodash";

@Component({
  selector: "my-app",
  template: `<div class="wrapper">
    <div class="toolPanel">
      <button (click)="setLegendEnabled(true)">Show Legend</button>
      <span class="spacer"></span>
      <button (click)="setLegendEnabled(false)">Hide Legend</button>
      <span class="spacer"></span>
      <div class="button-group">
        Legend Position:
        <span class="spacer"></span>
        <button class="button--code" (click)="updateLegendPosition('right')">
          'right'
        </button>
        <span class="spacer"></span>
        <button class="button--code" (click)="updateLegendPosition('bottom')">
          'bottom'
        </button>
        <span class="spacer"></span>
        <button class="button--code" (click)="updateLegendPosition('left')">
          'left'
        </button>
        <span class="spacer"></span>
        <button class="button--code" (click)="updateLegendPosition('top')">
          'top'
        </button>
      </div>
    </div>
    <ag-charts-angular
      style="height: 100%"
      [options]="options"
    ></ag-charts-angular>
  </div> `,
})
export class AppComponent {
  private options: AgChartOptions;

  constructor() {
    this.options = {
      data: [
        { label: "Android", value: 56.9 },
        { label: "iOS", value: 22.5 },
        { label: "BlackBerry", value: 6.8 },
        { label: "Symbian", value: 8.5 },
        { label: "Bada", value: 2.6 },
        { label: "Windows", value: 1.9 },
      ],
      series: [
        {
          type: "pie",
          angleKey: "value",
          labelKey: "label",
          strokeWidth: 3,
        },
      ],
      legend: {
        position: "right",
      },
    };
  }

  ngOnInit() {}

  updateLegendPosition = (value: AgChartLegendPosition) => {
    const options = cloneDeep(this.options);

    options.legend!.position = value;

    this.options = options;
  };

  setLegendEnabled = (enabled: boolean) => {
    const options = cloneDeep(this.options);

    options.legend!.enabled = enabled;

    this.options = options;
  };
}
