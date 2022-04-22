import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ModelUpdatedEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getData } from './data';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div class="example-header">
      <input
        type="text"
        id="quickFilter"
        placeholder="Filter..."
        [(ngModel)]="quickFilterText"
      />
      <div id="numberOfRows">Number of rows: {{ displayedRows }}</div>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      [quickFilterText]="quickFilterText"
      (modelUpdated)="onModelUpdated($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent implements OnInit {
  public displayedRows: number = 10;
  public quickFilterText: string = '';

  public columnDefs: ColDef[] = [
    { field: 'name' },
    { headerName: 'Age', field: 'person.age' },
    { headerName: 'Country', field: 'person.country' },
  ];
  public rowData: any[] | null = null;

  @ViewChild('myGrid') grid!: AgGridAngular;

  ngOnInit(): void {
    this.rowData = getData();
  }

  onModelUpdated(params: ModelUpdatedEvent) {
    this.displayedRows = params.api.getDisplayedRowCount();
  }
}
