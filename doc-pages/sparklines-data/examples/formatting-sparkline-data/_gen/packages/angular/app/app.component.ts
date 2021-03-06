import { Component } from '@angular/core';
import {
  AreaSparklineOptions,
  ColDef,
  GridReadyEvent,
  ValueGetterParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

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
    { field: 'symbol', maxWidth: 110 },
    { field: 'name', minWidth: 250 },
    {
      headerName: 'Rate of Change',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          type: 'area',
        } as AreaSparklineOptions,
      },
      valueGetter: (params: ValueGetterParams) => {
        const formattedData: any = [];
        const rateOfChange = params.data.rateOfChange;
        const { x, y } = rateOfChange;
        x.map((xVal: any, i: number) => formattedData.push([xVal, y[i]]));
        return formattedData;
      },
    },
    { field: 'volume', type: 'numericColumn', maxWidth: 140 },
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
