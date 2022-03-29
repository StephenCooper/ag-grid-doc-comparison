import { Component } from "@angular/core";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  AgChartTheme,
  ColDef,
  ColGroupDef,
  ColumnApi,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [popupParent]="popupParent"
    [rowData]="rowData"
    [enableRangeSelection]="true"
    [enableCharts]="true"
    [customChartThemes]="customChartThemes"
    [chartThemes]="chartThemes"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "country", width: 150, chartDataType: "category" },
    { field: "gold", chartDataType: "series" },
    { field: "silver", chartDataType: "series" },
    { field: "bronze", chartDataType: "series" },
    {
      headerName: "A",
      valueGetter: "Math.floor(Math.random()*1000)",
      chartDataType: "series",
    },
    {
      headerName: "B",
      valueGetter: "Math.floor(Math.random()*1000)",
      chartDataType: "series",
    },
    {
      headerName: "C",
      valueGetter: "Math.floor(Math.random()*1000)",
      chartDataType: "series",
    },
    {
      headerName: "D",
      valueGetter: "Math.floor(Math.random()*1000)",
      chartDataType: "series",
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public popupParent: HTMLElement = document.body;
  public rowData: any[] | null = getData();
  public customChartThemes: {
    [name: string]: AgChartTheme;
  } = {
    myCustomTheme: {
      palette: {
        fills: ["#e1ba00", "silver", "peru"],
        strokes: ["black", "#ff0000"],
      },
      overrides: {
        common: {
          padding: {
            top: 20,
            right: 30,
            bottom: 10,
            left: 2,
          },
          background: {
            fill: "#e5e5e5",
          },
          title: {
            enabled: true,
            fontStyle: "italic",
            fontWeight: "600",
            fontSize: 18,
            fontFamily: "Impact, sans-serif",
            color: "#414182",
          },
          legend: {
            enabled: true,
            position: "left",
            spacing: 20,
            item: {
              label: {
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: 18,
                fontFamily: "Palatino, serif",
                color: "#555",
              },
              marker: {
                shape: "diamond",
                size: 10,
                padding: 10,
                strokeWidth: 2,
              },
              paddingX: 120,
              paddingY: 20,
            },
          },
        },
        cartesian: {
          axes: {
            number: {
              bottom: {
                line: {
                  width: 5,
                },
              },
            },
            category: {
              left: {
                line: {
                  width: 2,
                },
              },
            },
          },
        },
      },
    },
  };
  public chartThemes: string[] = ["myCustomTheme", "ag-pastel", "ag-vivid"];

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ["country", "gold", "silver", "bronze"],
    };
    var createRangeChartParams: CreateRangeChartParams = {
      cellRange: cellRange,
      chartType: "groupedBar",
    };
    params.api.createRangeChart(createRangeChartParams);
  }

  onGridReady(params: GridReadyEvent) {}
}
