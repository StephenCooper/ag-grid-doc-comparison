
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, ColumnPinnedEvent, ColumnState, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
import { ControlsCellRenderer } from './controls-cell-renderer.component';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div class="legend-bar">
        <button (click)="onPinAthlete()">Pin Athlete</button>
        <button (click)="onUnpinAthlete()">Un-Pin Athlete</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="locked-col legend-box"></span> Position Locked Column
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [suppressDragLeaveHidesColumns]="true"
    [rowData]="rowData"
    (columnPinned)="onColumnPinned($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridColumnApi!: ColumnApi;

    
    public columnDefs: ColDef[] = [
    {
        lockPosition: true,
        valueGetter: 'node.rowIndex',
        cellClass: 'locked-col',
        width: 60,
        suppressNavigable: true,
    },
    {
        lockPosition: true,
        cellRenderer: ControlsCellRenderer,
        cellClass: 'locked-col',
        width: 120,
        suppressNavigable: true,
    },
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
];
public defaultColDef: ColDef = {
    width: 150,
    resizable: true,
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onColumnPinned(event: ColumnPinnedEvent) {
    const allCols = event.columnApi.getAllGridColumns();
    const allFixedCols = allCols.filter(col => col.getColDef().lockPosition);
    const allNonFixedCols = allCols.filter(col => !col.getColDef().lockPosition);
    const pinnedCount = allNonFixedCols.filter(col => col.getPinned() === 'left')
        .length;
    const pinFixed = pinnedCount > 0;
    const columnStates: ColumnState[] = [];
    allFixedCols.forEach(col => {
        if (pinFixed !== col.isPinned()) {
            columnStates.push({
                colId: col.getId(),
                pinned: pinFixed ? 'left' : null,
            });
        }
    });
    if (columnStates.length > 0) {
        event.columnApi.applyColumnState({ state: columnStates });
    }
}

onPinAthlete() {
    this.gridColumnApi.applyColumnState({
        state: [{ colId: 'athlete', pinned: 'left' }],
    });
}

onUnpinAthlete() {
    this.gridColumnApi.applyColumnState({
        state: [{ colId: 'athlete', pinned: null }],
    });
}

onGridReady(params: GridReadyEvent) {
        this.gridColumnApi = params.columnApi;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




