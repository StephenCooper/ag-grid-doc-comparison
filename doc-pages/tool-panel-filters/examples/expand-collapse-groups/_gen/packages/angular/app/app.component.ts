import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div>
      <span class="button-group">
        <button (click)="expandAthleteAndCompetition()">
          Expand Athlete &amp; Competition
        </button>
        <button (click)="collapseCompetition()">Collapse Competition</button>
        <button (click)="expandAll()">Expand All</button>
        <button (click)="collapseAll()">Collapse All</button>
      </span>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [sideBar]="sideBar"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      groupId: 'athleteGroupId',
      headerName: 'Athlete',
      children: [
        {
          headerName: 'Name',
          field: 'athlete',
          minWidth: 200,
          filter: 'agTextColumnFilter',
        },
        { field: 'age' },
        {
          groupId: 'competitionGroupId',
          headerName: 'Competition',
          children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
        },
        { field: 'country', minWidth: 200 },
      ],
    },
    { colId: 'sport', field: 'sport', minWidth: 200 },
    {
      headerName: 'Medals',
      children: [
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  collapseAll() {
    ((this.gridApi.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).collapseFilterGroups();
  }

  expandAthleteAndCompetition() {
    ((this.gridApi.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilterGroups([
      'athleteGroupId',
      'competitionGroupId',
    ]);
  }

  collapseCompetition() {
    ((this.gridApi.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).collapseFilterGroups([
      'competitionGroupId',
    ]);
  }

  expandAll() {
    ((this.gridApi.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilterGroups();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    // initially collapse all filter groups
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).collapseFilterGroups();

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
