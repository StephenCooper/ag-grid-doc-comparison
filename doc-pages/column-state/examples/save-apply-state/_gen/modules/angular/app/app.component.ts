
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, SideBarDef } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts
declare var window: any;

@Component({
    selector: 'my-app',
    template: `<div class="test-container">
    <div class="test-header">
        <div class="example-section">
            <button (click)="saveState()">Save State</button>
            <button (click)="restoreState()">Restore State</button>
            <button (click)="resetState()">Reset State</button>
        </div>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [sideBar]="sideBar"
    [rowGroupPanelShow]="rowGroupPanelShow"
    [pivotPanelShow]="pivotPanelShow"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridColumnApi!: ColumnApi;

    
    public columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
];
public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    width: 100,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
};
public sideBar: SideBarDef | string | boolean | null = {
    toolPanels: ['columns'],
};
public rowGroupPanelShow = 'always';
public pivotPanelShow = 'always';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    saveState() {
    window.colState = this.gridColumnApi.getColumnState();
    console.log('column state saved');
}

restoreState() {
    if (!window.colState) {
        console.log('no columns state to restore by, you must save state first');
        return;
    }
    this.gridColumnApi.applyColumnState({
        state: window.colState,
        applyOrder: true,
    });
    console.log('column state restored');
}

resetState() {
    this.gridColumnApi.resetColumnState();
    console.log('column state reset');
}

onGridReady(params: GridReadyEvent) {
        this.gridColumnApi = params.columnApi;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




