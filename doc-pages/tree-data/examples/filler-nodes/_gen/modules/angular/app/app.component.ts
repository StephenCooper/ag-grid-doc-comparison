import { ColDef, GetDataPath, GridReadyEvent } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [treeData]="true"
    [animateRows]="true"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [getDataPath]="getDataPath"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public rowData: any[] | null = [
    { orgHierarchy: ['A'] },
    { orgHierarchy: ['A', 'B'] },
    { orgHierarchy: ['C', 'D'] },
    { orgHierarchy: ['E', 'F', 'G', 'H'] },
  ];
  public columnDefs: ColDef[] = [
    // we're using the auto group column by default!
    {
      field: 'groupType',
      valueGetter: function (params) {
        return params.data ? 'Provided' : 'Filler';
      },
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public autoGroupColumnDef: ColDef = {
    headerName: 'Organisation Hierarchy',
    cellRendererParams: {
      suppressCount: true,
    },
  };
  public groupDefaultExpanded = -1;
  public getDataPath: GetDataPath = function (data: any) {
    return data.orgHierarchy;
  };

  onGridReady(params: GridReadyEvent) {}
}
