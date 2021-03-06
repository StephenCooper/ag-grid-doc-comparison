import { Component } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
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
    [sideBar]="sideBar"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: 'Age (No Comparator)',
      field: 'age',
      filter: 'agSetColumnFilter',
    },
    {
      headerName: 'Age (With Comparator)',
      field: 'age',
      filter: 'agSetColumnFilter',
      filterParams: filterParams,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    resizable: true,
  };
  public rowData: any[] | null = getRowData();
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';

  onGridReady(params: GridReadyEvent) {
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }
}

var filterParams = {
  comparator: (a: string, b: string) => {
    var valA = parseInt(a);
    var valB = parseInt(b);
    if (valA === valB) return 0;
    return valA > valB ? 1 : -1;
  },
};
function getRowData() {
  var rows = [];
  for (var i = 1; i < 117; i++) {
    rows.push({ age: i });
  }
  return rows;
}
