import { ColDef, ColGroupDef, GridReadyEvent } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
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
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      groupId: 'athleteGroupId',
      headerName: 'Athlete',
      children: [
        {
          headerName: 'Name',
          field: 'athlete',
          minWidth: 200,
          columnsMenuParams: {
            // hides the Column Filter section
            suppressColumnFilter: true,
            // hides the Select / Un-select all widget
            suppressColumnSelectAll: true,
            // hides the Expand / Collapse all widget
            suppressColumnExpandAll: true,
          },
        },
        {
          field: 'age',
          minWidth: 200,
          columnsMenuParams: {
            // contracts all column groups
            contractColumnSelection: true,
          },
        },
      ],
    },
    {
      groupId: 'medalsGroupId',
      headerName: 'Medals',
      children: [{ field: 'gold' }, { field: 'silver' }, { field: 'bronze' }],
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    menuTabs: ['columnsMenuTab'],
    columnsMenuParams: {
      // suppresses updating the layout of columns as they are rearranged in the grid
      suppressSyncLayoutWithGrid: true,
    },
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
