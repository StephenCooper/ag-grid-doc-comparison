import { Component } from "@angular/core";
import { AgCartesianChartOptions } from "ag-charts-community";
import { cloneDeep } from "lodash";

@Component({
  selector: "my-app",
  template: `<div class="wrapper">
    <div id="toolPanel">
      <button (click)="setTickCountTo5()">Set tick count to 5</button>
      <span class="spacer"></span>
      <button (click)="setTickCountTo10()">
        Set tick count to 10 (default)
      </button>
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
      data: generateSpiralData(),
      series: [
        {
          type: "line",
          xKey: "x",
          yKey: "y",
          marker: {
            enabled: false,
          },
        },
      ],
      axes: [
        {
          type: "number",
          position: "bottom",
          tick: {
            count: 10,
          },
        },
        {
          type: "number",
          position: "left",
          tick: {
            count: 10,
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }

  ngOnInit() {}

  setTickCountTo5 = () => {
    const options = cloneDeep(this.options);

    options.axes![0].tick!.count = 5;
    options.axes![1].tick!.count = 5;

    this.options = options;
  };

  setTickCountTo10 = () => {
    const options = cloneDeep(this.options);

    options.axes![0].tick!.count = 10;
    options.axes![1].tick!.count = 10;

    this.options = options;
  };
}

function generateSpiralData() {
  var a = 1;
  var b = 1;
  var data = [];
  var step = 0.1;
  for (var th = 1; th < 50; th += step) {
    var r = a + b * th;
    var datum = {
      x: r * Math.cos(th),
      y: r * Math.sin(th),
    };
    data.push(datum);
  }
  return data;
}
