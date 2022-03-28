
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `

<div style="display: flex; flex-direction: column; height: 100%;">
    <div style="display: flex;">
        <div class="row">
            <label for="allColumns"><input id="allColumns" type="checkbox">All Columns</label>
        </div>
    </div>
    <div style="margin: 10px 0;">
        <button (click)="onBtnUpdate()">Show CSV export content text</button>
        <button (click)="onBtnExport()">Download CSV export file</button>
    </div>
    <div style="flex: 1 1 0px; position: relative;">
        <div id="gridContainer">
            <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [defaultColDef]="defaultColDef"
    [suppressExcelExport]="true"
    [popupParent]="popupParent"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
        </div>
        <textarea id="csvResult">Click the Show CSV export content button to view exported CSV here</textarea>
    </div>
</div>

`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public defaultColDef: ColDef = {
    editable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
};
public popupParent: HTMLElement = document.body;
public columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'gold', hide: true },
    { field: 'silver', hide: true },
    { field: 'bronze', hide: true },
    { field: 'total' },
];
public rowData: any[] | null = getData()


    onBtnExport() {
    this.gridApi.exportDataAsCsv(getParams());
}

onBtnUpdate() {
    (document.querySelector('#csvResult') as any).value = this.gridApi.getDataAsCsv(getParams());
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}



function getBoolean(id: string) {
    var field: any = document.querySelector('#' + id);
    return !!field.checked;
}
function getParams() {
    return {
        allColumns: getBoolean('allColumns'),
    };
}
