import { Component } from '@angular/core';
import {
  ColDef,
  GetDataPath,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <input
        type="text"
        id="filter-text-box"
        placeholder="Filter..."
        (input)="onFilterTextBoxChanged()"
      />
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [rowData]="rowData"
      [treeData]="true"
      [animateRows]="true"
      [groupDefaultExpanded]="groupDefaultExpanded"
      [getDataPath]="getDataPath"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    // we're using the auto group column by default!
    { field: 'jobTitle' },
    { field: 'employmentType' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public autoGroupColumnDef: ColDef = {
    headerName: 'Organisation Hierarchy',
    minWidth: 300,
    cellRendererParams: {
      suppressCount: true,
    },
  };
  public rowData: any[] | null = getData();
  public groupDefaultExpanded = -1;
  public getDataPath: GetDataPath = function (data: any) {
    return data.orgHierarchy;
  };

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as any).value
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
