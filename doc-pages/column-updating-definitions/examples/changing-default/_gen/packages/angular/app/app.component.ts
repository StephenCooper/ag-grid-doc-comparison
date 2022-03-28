
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="test-container">
    <div class="test-header">
        <button (click)="onBtWithDefault()">Set Columns with Initials</button>
        <button (click)="onBtRemove()">Remove Columns</button>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [defaultColDef]="defaultColDef"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public defaultColDef: ColDef = {
    initialWidth: 100,
    sortable: true,
    resizable: true,
};
public columnDefs: ColDef[] = getColumnDefs();
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onBtWithDefault() {
    this.gridApi.setColumnDefs(getColumnDefs());
}

onBtRemove() {
    this.gridApi.setColumnDefs([]);
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}



function getColumnDefs(): ColDef[] {
    return [
        { field: 'athlete', initialWidth: 100, initialSort: 'asc' },
        { field: 'age' },
        { field: 'country', initialPinned: 'left' },
        { field: 'sport' },
        { field: 'year' },
        { field: 'date' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ];
}
