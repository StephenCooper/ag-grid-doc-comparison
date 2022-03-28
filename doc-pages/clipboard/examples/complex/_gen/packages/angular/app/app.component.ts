
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
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [clipboardDelimiter]="clipboardDelimiter"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: (ColDef | ColGroupDef)[] = [
    {
        headerName: 'Participants',
        children: [
            { field: 'athlete', minWidth: 200 },
            { field: 'age' },
            { field: 'country', minWidth: 150 },
        ]
    },
    {
        headerName: 'Olympic Games',
        children: [
            { field: 'year' },
            { field: 'date', minWidth: 150 },
            { field: 'sport', minWidth: 150 },
            { field: 'gold' },
            { field: 'silver', suppressPaste: true },
            { field: 'bronze' },
            { field: 'total' },
        ]
    }
];
public defaultColDef: ColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
};
public clipboardDelimiter = ',';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}



