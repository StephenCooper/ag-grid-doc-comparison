import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { SliderFloatingFilter } from './slider-floating-filter.component';

@Component({
  selector: 'my-app',
  template: `
    <div style="height: 100%; box-sizing: border-box;">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'country', filter: false },
    { field: 'language', filter: false },
    { field: 'name', filter: false },
    {
      field: 'gold',
      floatingFilterComponent: SliderFloatingFilter,
      floatingFilterComponentParams: {
        maxValue: 7,
        suppressFilterButton: true,
      },
      filter: 'agNumberColumnFilter',
      suppressMenu: false,
    },
    {
      field: 'silver',
      filter: 'agNumberColumnFilter',
      floatingFilterComponent: SliderFloatingFilter,
      floatingFilterComponentParams: {
        maxValue: 5,
        suppressFilterButton: true,
      },
      suppressMenu: false,
    },
    {
      field: 'bronze',
      filter: 'agNumberColumnFilter',
      floatingFilterComponent: SliderFloatingFilter,
      floatingFilterComponentParams: {
        maxValue: 10,
        suppressFilterButton: true,
      },
      suppressMenu: false,
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  public rowData: any[] | null = getData();

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }
}
