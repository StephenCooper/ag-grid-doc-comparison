import { cloneDeep } from "lodash";
import { Component } from "@angular/core";
import * as agCharts from "ag-charts-community";
import { AgChartOptions } from "ag-charts-community";

@Component({
  selector: "my-app",
  template: `<div class="wrapper">
    <div id="toolPanel">
      <div class="slider">
        <label for="sliderInput"><strong>Height:</strong></label>
        <span id="sliderValue">430</span>
        <input
          type="range"
          id="sliderInput"
          min="200"
          max="430"
          value="430"
          (input)="updateHeight($event)"
          (change)="updateHeight($event)"
        />
      </div>
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
      autoSize: false,
      width: 750,
      height: 430,
      data: [
        { label: "USA", value: 56.9 },
        { label: "UK", value: 22.5 },
        { label: "China", value: 6.8 },
        { label: "Russia", value: 8.5 },
        { label: "India", value: 2.6 },
        { label: "Germany", value: 18.2 },
        { label: "France", value: 12.5 },
        { label: "Canada", value: 3.9 },
        { label: "Spain", value: 7.9 },
        { label: "South Africa", value: 21.9 },
        { label: "Portugal", value: 7.4 },
        { label: "Netherlands", value: 4.7 },
        { label: "Finland", value: 3.9 },
        { label: "Sweden", value: 3.3 },
        { label: "Norway", value: 3.2 },
        { label: "Greece", value: 1.9 },
        { label: "Italy", value: 2.5 },
      ],
      series: [
        {
          type: "pie",
          angleKey: "value",
          labelKey: "label",
          strokeWidth: 3,
        },
      ],
    };
  }

  ngOnInit() {}

  updateHeight = (event: any) => {
    const options = cloneDeep(this.options);

    var value = +event.target.value;
    options.height = value;

    document.getElementById("sliderValue")!.innerHTML = String(value);

    this.options = options;
  };
}
