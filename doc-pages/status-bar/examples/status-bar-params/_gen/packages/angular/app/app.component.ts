
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, FirstDataRenderedEvent, Grid, GridApi, GridOptions, GridReadyEvent, StatusPanelDef } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [statusBar]="statusBar"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 200 },
    { field: 'age' },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'date', minWidth: 180 },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
};
public statusBar: {
        statusPanels: StatusPanelDef[];
    } = {
    statusPanels: [
        {
            statusPanel: 'agAggregationComponent',
            statusPanelParams: {
                // possible values are: 'count', 'sum', 'min', 'max', 'avg'
                aggFuncs: ['sum', 'avg'],
            },
        },
    ],
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onFirstDataRendered(event: FirstDataRenderedEvent) {
    event.api.addCellRange({
        rowStartIndex: 3,
        rowEndIndex: 8,
        columns: ['age'],
    });
}

onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




