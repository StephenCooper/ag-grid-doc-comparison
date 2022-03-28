
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
import { MedalCellRenderer } from './medal-cell-renderer.component';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
        <button (click)="onCallGold()">Gold</button>
        <button (click)="onFirstRowGold()">First Row Gold</button>
        <button (click)="onCallAllCells()">All Cells</button>
    </div>
    
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', width: 150 },
    { field: 'country', width: 150 },
    { field: 'year', width: 100 },
    { field: 'gold', width: 100, cellRenderer: MedalCellRenderer },
    { field: 'silver', width: 100, cellRenderer: MedalCellRenderer },
    { field: 'bronze', width: 100, cellRenderer: MedalCellRenderer },
    { field: 'total', width: 100 },
];
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


    onCallGold() {
    console.log('=========> calling all gold');
    // pass in list of columns, here it's gold only
    const params = { columns: ['gold'] };
    const instances = this.gridApi.getCellRendererInstances(params) as any[];
    instances.forEach(instance => {
        instance.medalUserFunction();
    });
}

onFirstRowGold() {
    console.log('=========> calling gold row one');
    // pass in one column and one row to identify one cell
    const firstRowNode = this.gridApi.getDisplayedRowAtIndex(0)!;
    const params = { columns: ['gold'], rowNodes: [firstRowNode] };
    const instances = this.gridApi.getCellRendererInstances(params) as any[];
    instances.forEach(instance => {
        instance.medalUserFunction();
    });
}

onCallAllCells() {
    console.log('=========> calling everything');
    // no params, goes through all rows and columns where cell renderer exists
    const instances = this.gridApi.getCellRendererInstances() as any[];
    instances.forEach(instance => {
        instance.medalUserFunction();
    });
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    this.rowData = data;
});
    }
}




