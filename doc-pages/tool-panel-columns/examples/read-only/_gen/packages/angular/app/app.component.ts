
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="test-container">
    <div class="test-header">
        <label><input type="checkbox" id="read-only" (change)="setReadOnly()"> Functions Read Only</label>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [pivotMode]="true"
    [sideBar]="sideBar"
    [rowGroupPanelShow]="rowGroupPanelShow"
    [pivotPanelShow]="pivotPanelShow"
    [functionsReadOnly]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    {
        field: 'athlete',
        minWidth: 200,
        enableRowGroup: true,
        enablePivot: true,
    },
    {
        field: 'age',
        enableValue: true,
    },
    {
        field: 'country',
        minWidth: 200,
        enableRowGroup: true,
        enablePivot: true,
        rowGroupIndex: 1,
    },
    {
        field: 'year',
        enableRowGroup: true,
        enablePivot: true,
        pivotIndex: 1,
    },
    {
        field: 'date',
        minWidth: 180,
        enableRowGroup: true,
        enablePivot: true,
    },
    {
        field: 'sport',
        minWidth: 200,
        enableRowGroup: true,
        enablePivot: true,
        rowGroupIndex: 2,
    },
    {
        field: 'gold',
        hide: true,
        enableValue: true,
    },
    {
        field: 'silver',
        hide: true,
        enableValue: true,
        aggFunc: 'sum',
    },
    {
        field: 'bronze',
        hide: true,
        enableValue: true,
        aggFunc: 'sum',
    },
    {
        headerName: 'Total',
        field: 'totalAgg',
        valueGetter: 'node.group ? data.totalAgg : data.gold + data.silver + data.bronze',
    },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
};
public autoGroupColumnDef: ColDef = {
    minWidth: 250,
};
public sideBar: SideBarDef | string | boolean | null = 'columns';
public rowGroupPanelShow = 'always';
public pivotPanelShow = 'always';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    setReadOnly() {
    this.gridApi.setFunctionsReadOnly((document.getElementById('read-only') as HTMLInputElement).checked);
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        
    (document.getElementById('read-only') as HTMLInputElement).checked = true;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




