
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, RowGroupingDisplayType, ValueGetterParams } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div class="example-header">
        <span class="legend-item ag-row-level-0"></span>
        <span class="legend-label">Top Level Group</span>
        <span class="legend-item ag-row-level-1"></span>
        <span class="legend-label">Second Level Group</span>
        <span class="legend-item ag-row-level-2"></span>
        <span class="legend-label">Bottom Rows</span>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [groupDisplayType]="groupDisplayType"
    [groupHideOpenParents]="true"
    [enableRangeSelection]="true"
    [animateRows]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    {
        headerName: 'Country',
        showRowGroup: 'country',
        cellRenderer: 'agGroupCellRenderer',
        minWidth: 200,
    },
    {
        headerName: 'Year',
        valueGetter: function (params: ValueGetterParams) {
            if (params.data) {
                return params.data.year;
            }
        },
        showRowGroup: 'year',
        cellRenderer: 'agGroupCellRenderer',
    },
    { field: 'athlete', minWidth: 200 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'total', aggFunc: 'sum' },
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
};
public groupDisplayType: RowGroupingDisplayType = 'custom';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




