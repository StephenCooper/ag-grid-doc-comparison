
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, StatusPanelDef } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [rowSelection]="rowSelection"
    [statusBar]="statusBar"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 200 },
    { field: 'age', filter: 'agNumberColumnFilter' },
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
    filter: true,
    resizable: true,
};
public rowSelection = 'multiple';
public statusBar: {
        statusPanels: StatusPanelDef[];
    } = {
    statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agTotalRowCountComponent', align: 'center' },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
    ],
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




