import { Component } from "@angular/core";
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
      data: getData().sort(function (a: any, b: any) {
        return getTotal(b) - getTotal(a);
      }),
      theme: {
        overrides: {
          bar: {
            series: {
              strokeWidth: 0,
              highlightStyle: {
                series: {
                  strokeWidth: 1,
                  dimOpacity: 0.3,
                },
              },
            },
          },
        },
      },
      title: {
        text: "UK Housing Stock (2016)",
        fontSize: 18,
      },
      subtitle: {
        text: "Source: Ministry of Housing, Communities & Local Government",
      },
      series: [
        {
          type: "bar",
          xKey: "type",
          yKey: "ownerOccupied",
          yName: "Owner occupied",
          stacked: true,
        },
        {
          type: "bar",
          xKey: "type",
          yKey: "privateRented",
          yName: "Private rented",
          stacked: true,
        },
        {
          type: "bar",
          xKey: "type",
          yKey: "localAuthority",
          yName: "Local authority",
          stacked: true,
        },
        {
          type: "bar",
          xKey: "type",
          yKey: "housingAssociation",
          yName: "Housing association",
          stacked: true,
        },
      ],
      axes: [
        {
          type: "category",
          position: "left",
        },
        {
          type: "number",
          position: "top",
        },
      ],
      legend: {
        position: "bottom",
      },
    };
  }

  ngOnInit() {}
}

function getTotal(datum: any) {
  return (
    datum.ownerOccupied +
    datum.privateRented +
    datum.localAuthority +
    datum.housingAssociation
  );
}
