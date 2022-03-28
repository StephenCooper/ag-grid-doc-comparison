
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div style="height: 100%; box-sizing: border-box;">
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [suppressColumnVirtualisation]="true"
    [suppressRowVirtualisation]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'sport' },
    { field: 'age' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
];
public defaultColDef: ColDef = {
    valueFormatter: p => {
        console.log('formatter called ' + times + ' times');
        times++;
        return p.value;
    }
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => params.api!.setRowData(data.slice(0, 100)));
    }
}



let times = 1;
