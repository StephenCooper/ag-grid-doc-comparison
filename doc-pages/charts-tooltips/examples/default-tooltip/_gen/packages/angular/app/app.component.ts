import { Component } from "@angular/core";
import { AgCartesianChartOptions } from "ag-charts-community";
import { cloneDeep } from "lodash";

@Component({
  selector: "my-app",
  template: `<div class="wrapper">
    <div id="toolPanel">
      <button (click)="setYNames()">Set yNames</button>
      <span class="spacer"></span>
      <button (click)="resetYNames()">Reset yNames</button>
      <span class="spacer"></span>
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
        {
          month: "Jun",
          value1: 50,
          hats_made: 40,
        },
        {
          month: "Jul",
          value1: 70,
          hats_made: 50,
        },
        {
          month: "Aug",
          value1: 60,
          hats_made: 30,
        },
      ],
      series: [
        { type: "column", xKey: "month", stacked: true, yKey: "value1" },
        { type: "column", xKey: "month", stacked: true, yKey: "hats_made" },
      ],
    };
  }

  ngOnInit() {}

  setYNames = () => {
    const options = cloneDeep(this.options);

    options.series![0].yName = "Sweaters Made";
    options.series![1].yName = "Hats Made";

    this.options = options;
  };

  resetYNames = () => {
    const options = cloneDeep(this.options);

    options.series![0].yName = undefined;
    options.series![1].yName = undefined;
    this.options = options;
  };
}
