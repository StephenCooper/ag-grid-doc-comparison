import {
  BarFormat,
  BarFormatterParams,
  ColDef,
  GridReadyEvent,
  LabelFormatterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [rowHeight]="rowHeight"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
      field: 'change',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          type: 'bar',
          label: {
            enabled: true,
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
            formatter: function (params: LabelFormatterParams) {
              return `${params.value}%`;
            },
          },
          paddingOuter: 0,
          padding: {
            top: 0,
            bottom: 0,
          },
          valueAxisDomain: [0, 100],
          axis: {
            strokeWidth: 0,
          },
          tooltip: {
            enabled: false,
          },
          formatter: formatter,
        },
      },
    },
    {
      field: 'volume',
      type: 'numericColumn',
      maxWidth: 140,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  public rowData: any[] | null = getData();
  public rowHeight = 50;

  onGridReady(params: GridReadyEvent) {}
}

function formatter(params: BarFormatterParams): BarFormat {
  const { yValue } = params;
  return {
    fill: yValue <= 20 ? '#4fa2d9' : yValue < 60 ? '#277cb5' : '#195176',
  };
}
