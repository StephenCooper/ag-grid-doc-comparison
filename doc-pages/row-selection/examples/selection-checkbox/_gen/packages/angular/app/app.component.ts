
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { CheckboxSelectionCallbackParams, ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [rowSelection]="rowSelection"
    [groupSelectsChildren]="true"
    [suppressRowClickSelection]="true"
    [suppressAggFuncInHeader]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    {
        field: 'age',
        minWidth: 120,
        checkboxSelection: checkboxSelection,
        aggFunc: 'sum',
    },
    { field: 'year', maxWidth: 120 },
    { field: 'date', minWidth: 150 },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
};
public autoGroupColumnDef: ColDef = {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox
    },
};
public rowSelection = 'multiple';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}



function checkboxSelection(params: CheckboxSelectionCallbackParams) {
    return params.node.group === true;
}
function checkbox(params: ICellRendererParams) {
    return params.node.group === true;
}
