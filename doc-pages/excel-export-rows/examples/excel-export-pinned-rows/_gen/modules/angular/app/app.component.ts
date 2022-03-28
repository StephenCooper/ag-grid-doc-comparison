
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div class="container">
    <div class="columns">
        <div class="column">
            <label for="skipPinnedTop"><input id="skipPinnedTop" type="checkbox">Skip Pinned Top Rows</label>
        </div>
        <div class="column">
            <label for="skipPinnedBottom"><input id="skipPinnedBottom" type="checkbox">Skip Pinned Bottom Rows</label>
        </div>
        <div>
            <button (click)="onBtExport()" style="margin: 5px 0px; font-weight: bold;">Export to Excel</button>
        </div>
    </div>
    <div class="grid-wrapper">
        <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [popupParent]="popupParent"
    [pinnedTopRowData]="pinnedTopRowData"
    [pinnedBottomRowData]="pinnedBottomRowData"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    </div>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: (ColDef | ColGroupDef)[] = [
    {
        headerName: 'Top Level Column Group',
        children: [
            {
                headerName: 'Group A',
                children: [
                    { field: 'athlete', minWidth: 200 },
                    { field: 'country', minWidth: 200 },
                    { headerName: 'Group', valueGetter: 'data.country.charAt(0)' },
                ],
            },
            {
                headerName: 'Group B',
                children: [
                    { field: 'date', minWidth: 150 },
                    { field: 'sport', minWidth: 150 },
                    { field: 'gold' },
                    { field: 'silver' },
                    { field: 'bronze' },
                    { field: 'total' },
                ],
            },
        ],
    },
];
public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
};
public popupParent: HTMLElement = document.body;
public pinnedTopRowData: any[] = [
    {
        athlete: 'Floating <Top> Athlete',
        country: 'Floating <Top> Country',
        date: '01/08/2020',
        sport: 'Track & Field',
        gold: 22,
        silver: '003',
        bronze: 44,
        total: 55,
    },
];
public pinnedBottomRowData: any[] = [
    {
        athlete: 'Floating <Bottom> Athlete',
        country: 'Floating <Bottom> Country',
        date: '01/08/2030',
        sport: 'Track & Field',
        gold: 222,
        silver: '005',
        bronze: 244,
        total: 255,
    },
];
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onBtExport() {
    this.gridApi.exportDataAsExcel(getParams());
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-olympic-winners.json').subscribe(data => params.api!.setRowData(data.filter((rec: any) => rec.country != null)));
    }
}



function getBoolean(id: string) {
    return !!(document.querySelector('#' + id) as HTMLInputElement).checked;
}
function getParams() {
    return {
        skipPinnedTop: getBoolean('skipPinnedTop'),
        skipPinnedBottom: getBoolean('skipPinnedBottom'),
    };
}
