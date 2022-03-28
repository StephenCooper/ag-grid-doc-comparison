
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [defaultColDef]="defaultColDef"
    [animateRows]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'country', width: 120, rowGroup: true },
    { field: 'year', width: 90, rowGroup: true },
    { field: 'sport', width: 110 },
    { field: 'athlete', width: 200 },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100 },
    { field: 'age', width: 90 },
    { field: 'date', width: 110 },
];
public autoGroupColumnDef: ColDef = {
    headerTooltip: 'Group',
    minWidth: 190,
    tooltipValueGetter: params => {
        const count = params.node && params.node.allChildrenCount;
        if (count != null) {
            return params.value + ' (' + count + ')';
        }
        return params.value;
    },
};
public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    this.rowData = data;
});
    }
}




