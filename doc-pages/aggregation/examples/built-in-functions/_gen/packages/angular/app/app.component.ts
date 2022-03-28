
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [sideBar]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    {
        field: 'gold',
        aggFunc: 'sum',
        enableValue: true,
        allowedAggFuncs: ['sum', 'min', 'max'],
    },
    { field: 'silver', aggFunc: 'min', enableValue: true },
    { field: 'bronze', aggFunc: 'max', enableValue: true },
    { field: 'total', aggFunc: 'avg', enableValue: true, minWidth: 200 },
    { field: 'age' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
};
public autoGroupColumnDef: ColDef = {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer'
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




