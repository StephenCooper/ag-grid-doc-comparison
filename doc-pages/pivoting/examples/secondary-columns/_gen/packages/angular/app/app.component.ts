
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, PostProcessSecondaryColDefParams, PostProcessSecondaryColGroupDefParams, SideBarDef } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `

<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [sideBar]="true"
    [pivotMode]="true"
    [suppressAggFuncInHeader]="true"
    [postProcessSecondaryColDef]="postProcessSecondaryColDef"
    [postProcessSecondaryColGroupDef]="postProcessSecondaryColGroupDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, enableRowGroup: true },
    {
        field: 'year',
        pivot: true,
        enablePivot: true,
        pivotComparator: MyYearPivotComparator,
    },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    resizable: true,
};
public autoGroupColumnDef: ColDef = {
    minWidth: 250,
};
public postProcessSecondaryColDef: (params: PostProcessSecondaryColDefParams) => void = function (params: PostProcessSecondaryColDefParams) {
    const colDef = params.colDef;
    // make all the columns upper case
    colDef.headerName = colDef.headerName!.toUpperCase();
    // the pivot keys are the keys use for the pivot
    // don't change these, but you can use them for your information
    // console.log('Pivot Keys:');
    // console.log(colDef.pivotKeys);
    // // the value column is the value we are aggregating on
    // console.log('Pivot Value Keys:');
    // console.log(colDef.pivotValueColumn);
};
public postProcessSecondaryColGroupDef: (params: PostProcessSecondaryColGroupDefParams) => void = function (params: PostProcessSecondaryColGroupDefParams) {
    const colGroupDef = params.colGroupDef;
    // for fun, add a css class for 2002    
    if (colGroupDef.pivotKeys![0] === '2002') {
        colGroupDef.headerClass = 'color-background';
    }
    // put 'year' in front of each group
    colGroupDef.headerName = 'Year ' + colGroupDef.headerName;
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}



function MyYearPivotComparator(a: string, b: string) {
    var requiredOrder = ['2012', '2010', '2008', '2006', '2004', '2002', '2000'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
}
