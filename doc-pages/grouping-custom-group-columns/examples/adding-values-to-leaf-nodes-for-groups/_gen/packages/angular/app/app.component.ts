
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, RowGroupingDisplayType, ValueGetterParams } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [groupDisplayType]="groupDisplayType"
    [enableRangeSelection]="true"
    [animateRows]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    {
        headerName: 'Country',
        colId: 'countryGroup',
        showRowGroup: 'country',
        minWidth: 200,
        cellRenderer: 'agGroupCellRenderer',
        filterValueGetter: function (params: ValueGetterParams) {
            return params.data ? params.data.country : null;
        },
    },
    { field: 'country', rowGroup: true, hide: true },
    {
        headerName: 'Year / Athlete',
        colId: 'yearAthleteGroup',
        minWidth: 220,
        showRowGroup: 'year',
        cellRenderer: 'agGroupCellRenderer',
        valueGetter: 'data ? data.athlete : null',
    },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
    { field: 'age' },
    { field: 'date', minWidth: 140 },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
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




