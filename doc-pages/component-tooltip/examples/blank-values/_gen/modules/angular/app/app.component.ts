import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
  ITooltipParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomTooltip } from './custom-tooltip.component';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: 'Athlete Col 1',
      field: 'athlete',
      minWidth: 150,
      tooltipField: 'athlete',
    },
    {
      headerName: 'Athlete Col 2',
      field: 'athlete',
      minWidth: 150,
      tooltipComponent: CustomTooltip,
      tooltipValueGetter: toolTipValueGetter,
    },
    { field: 'sport', width: 110 },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100 },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.getDisplayedRowAtIndex(0)!.data.athlete = undefined;
    params.api.getDisplayedRowAtIndex(1)!.data.athlete = null;
    params.api.getDisplayedRowAtIndex(2)!.data.athlete = '';
    params.api.refreshCells();
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}

const toolTipValueGetter = (params: ITooltipParams) => ({
  value: params.value,
});
