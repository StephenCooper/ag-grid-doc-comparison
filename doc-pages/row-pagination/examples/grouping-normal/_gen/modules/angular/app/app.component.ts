
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [pagination]="true"
    [paginationPageSize]="paginationPageSize"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country', rowGroup: true },
    { field: 'year', rowGroup: true },
    { field: 'date' },
    { field: 'sport', rowGroup: true },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
];
public paginationPageSize = 10;
public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 190,
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}



