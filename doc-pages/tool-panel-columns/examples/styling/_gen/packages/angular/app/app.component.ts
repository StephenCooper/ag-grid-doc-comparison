
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, HeaderValueGetterParams, SideBarDef } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `
<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [sideBar]="sideBar"
    [rowGroupPanelShow]="rowGroupPanelShow"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
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
        headerValueGetter: countryHeaderValueGetter,
    },
    {
        field: 'year',
        enableRowGroup: true,
        enablePivot: true,
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
    },
    {
        field: 'gold',
        hide: true,
        enableValue: true,
        toolPanelClass: 'tp-gold',
    },
    {
        field: 'silver',
        hide: true,
        enableValue: true,
        toolPanelClass: ['tp-silver'],
    },
    {
        field: 'bronze',
        hide: true,
        enableValue: true,
        toolPanelClass: function (params) {
            return 'tp-bronze';
        },
    },
    {
        headerName: 'Total',
        field: 'totalAgg',
        valueGetter: 'node.group ? data.totalAgg : data.gold + data.silver + data.bronze',
    },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
};
public sideBar: SideBarDef | string | boolean | null = 'columns';
public rowGroupPanelShow = 'always';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}



function countryHeaderValueGetter(params: HeaderValueGetterParams) {
    switch (params.location) {
        case 'csv':
            return 'CSV Country';
        case 'clipboard':
            return 'CLIP Country';
        case 'columnToolPanel':
            return 'TP Country';
        case 'columnDrop':
            return 'CD Country';
        case 'header':
            return 'H Country';
        default:
            return 'Should never happen!';
    }
}
