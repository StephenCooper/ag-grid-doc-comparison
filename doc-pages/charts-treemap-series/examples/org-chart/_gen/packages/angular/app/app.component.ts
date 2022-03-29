import { Component } from "@angular/core";
import { AgChartOptions } from "ag-charts-community";
declare var data: any;

@Component({
  selector: "my-app",
  template: `<ag-charts-angular
    style="height: 100%"
    [options]="options"
  ></ag-charts-angular>`,
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
          labelKey: "orgHierarchy",
          colorParents: true,
          gradient: false,
          nodePadding: 5,
          sizeKey: undefined,
          colorKey: undefined,
          colorDomain: [0, 2, 4],
          colorRange: ["#d73027", "#fee08b", "#1a9850"],
        },
      ],
      title: {
        text: "Organizational Chart",
      },
      subtitle: {
        text: "of a top secret startup",
      },
    };
  }

  ngOnInit() {}
}
