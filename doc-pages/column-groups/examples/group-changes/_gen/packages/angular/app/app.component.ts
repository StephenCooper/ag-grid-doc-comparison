import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<div class="test-container">
    <div class="test-header">
      <label>
        <button (click)="onBtNoGroups()">No Groups</button>
      </label>
      <label>
        <div class="participant-group legend-box"></div>
        <button (click)="onParticipantInGroupOnly()">
          Participant in Group
        </button>
      </label>
      <label>
        <div class="medals-group legend-box"></div>
        <button (click)="onMedalsInGroupOnly()">Medals in Group</button>
      </label>
      <label>
        <div class="participant-group legend-box"></div>
        <div class="medals-group legend-box"></div>
        <button (click)="onParticipantAndMedalsInGroups()">
          Participant and Medals in Group
        </button>
      </label>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [maintainColumnOrder]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", colId: "athlete" },
    { field: "age", colId: "age" },
    { field: "country", colId: "country" },
    { field: "year", colId: "year" },
    { field: "date", colId: "date" },
    { field: "total", colId: "total" },
    { field: "gold", colId: "gold" },
    { field: "silver", colId: "silver" },
    { field: "bronze", colId: "bronze" },
  ];
  public defaultColDef: ColDef = {
    initialWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtNoGroups() {
    const columnDefs: ColDef[] = [
      { field: "athlete", colId: "athlete" },
      { field: "age", colId: "age" },
      { field: "country", colId: "country" },
      { field: "year", colId: "year" },
      { field: "date", colId: "date" },
      { field: "total", colId: "total" },
      { field: "gold", colId: "gold" },
      { field: "silver", colId: "silver" },
      { field: "bronze", colId: "bronze" },
    ];
    this.gridApi.setColumnDefs(columnDefs);
  }

  onMedalsInGroupOnly() {
    const columnDefs: (ColDef | ColGroupDef)[] = [
      { field: "athlete", colId: "athlete" },
      { field: "age", colId: "age" },
      { field: "country", colId: "country" },
      { field: "year", colId: "year" },
      { field: "date", colId: "date" },
      {
        headerName: "Medals",
        headerClass: "medals-group",
        children: [
          { field: "total", colId: "total" },
          { field: "gold", colId: "gold" },
          { field: "silver", colId: "silver" },
          { field: "bronze", colId: "bronze" },
        ],
      },
    ];
    this.gridApi.setColumnDefs(columnDefs);
  }

  onParticipantInGroupOnly() {
    const columnDefs: (ColDef | ColGroupDef)[] = [
      {
        headerName: "Participant",
        headerClass: "participant-group",
        children: [
          { field: "athlete", colId: "athlete" },
          { field: "age", colId: "age" },
          { field: "country", colId: "country" },
          { field: "year", colId: "year" },
          { field: "date", colId: "date" },
        ],
      },
      { field: "total", colId: "total" },
      { field: "gold", colId: "gold" },
      { field: "silver", colId: "silver" },
      { field: "bronze", colId: "bronze" },
    ];
    this.gridApi.setColumnDefs(columnDefs);
  }

  onParticipantAndMedalsInGroups() {
    const columnDefs: (ColDef | ColGroupDef)[] = [
      {
        headerName: "Participant",
        headerClass: "participant-group",
        children: [
          { field: "athlete", colId: "athlete" },
          { field: "age", colId: "age" },
          { field: "country", colId: "country" },
          { field: "year", colId: "year" },
          { field: "date", colId: "date" },
        ],
      },
      {
        headerName: "Medals",
        headerClass: "medals-group",
        children: [
          { field: "total", colId: "total" },
          { field: "gold", colId: "gold" },
          { field: "silver", colId: "silver" },
          { field: "bronze", colId: "bronze" },
        ],
      },
    ];
    this.gridApi.setColumnDefs(columnDefs);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
