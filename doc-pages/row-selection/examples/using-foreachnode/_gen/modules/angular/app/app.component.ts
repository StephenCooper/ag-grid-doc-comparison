
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
        <button (click)="selectAllAmerican()">Select All American</button>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowSelection]="rowSelection"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
};
public rowSelection = 'multiple';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    selectAllAmerican() {
    this.gridApi.forEachNode(function (node) {
        node.setSelected(node.data.country === 'United States');
    });
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




