
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div style="height: 100%; display: flex; flex-direction: column;">
    <div style="margin-bottom: 4px;">
        <button (click)="start()">► Start</button>
        <button (click)="stop()">■ Stop</button>
    </div>
    <div style="flex-grow: 1;">
        <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [rowHeight]="rowHeight"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    </div>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
        field: 'change',
        cellRenderer: 'agSparklineCellRenderer',
    },
    {
        field: 'volume',
        type: 'numericColumn',
        maxWidth: 140,
    },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
};
public rowData: any[] | null = getData();
public rowHeight = 50


    start() {
    if (intervalId) {
        return;
    }
    const updateData = () => {
        const itemsToUpdate: any[] = [];
        this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode) {
            const data = rowNode.data;
            const n = data.change.length;
            const v = Math.random() > 0.5 ? Number(Math.random()) : -Number(Math.random());
            data.change = [...data.change.slice(1, n), v];
            itemsToUpdate.push(data);
        });
        this.gridApi.applyTransaction({ update: itemsToUpdate });
    };
    intervalId = setInterval(updateData, 300);
}

stop() {
    if (intervalId === undefined) {
        return;
    }
    clearInterval(intervalId);
    intervalId = undefined;
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}



var intervalId: any;
