import { Component } from "@angular/core";
import { AgChartOptions } from "ag-charts-community";

@Component({
  selector: "my-app",
  template: `<div class="wrapper">
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
      title: {
        text: "Number of Cars Sold",
      },
      subtitle: {
        text: "(click a column for details)",
      },
      data: [
        { month: "March", units: 25, brands: { BMW: 10, Toyota: 15 } },
        { month: "April", units: 27, brands: { Ford: 17, BMW: 10 } },
        { month: "May", units: 42, brands: { Nissan: 20, Toyota: 22 } },
      ],
      series: [
        {
          type: "column",
          xKey: "month",
          yKey: "units",
          listeners: {
            nodeClick: function (event: any) {
              var datum = event.datum;
              window.alert(
                "Cars sold in " +
                  datum[event.xKey] +
                  ": " +
                  String(datum[event.yKey]) +
                  "\n" +
                  listUnitsSoldByBrand(datum["brands"])
              );
            },
          },
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
      legend: {
        enabled: false,
      },
    };
  }

  ngOnInit() {}
}

function listUnitsSoldByBrand(brands: Record<string, number>) {
  var result = "";
  for (var key in brands) {
    result += key + ": " + brands[key] + "\n";
  }
  return result;
}
