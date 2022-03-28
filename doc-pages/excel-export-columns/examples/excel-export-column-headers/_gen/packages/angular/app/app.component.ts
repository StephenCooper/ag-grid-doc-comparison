
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="container">
    <div class="columns">
        <label class="option" for="columnGroups">
            <input id="columnGroups" type="checkbox">Skip Column Group Headers
        </label>
        <label class="option" for="skipHeader">
            <input id="skipHeader" type="checkbox">Skip Column Headers
        </label>
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
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    </div>
</div>
`
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
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onBtExport() {
    this.gridApi.exportDataAsExcel(getParams());
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        
    (document.getElementById('columnGroups') as HTMLInputElement).checked = true;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-olympic-winners.json').subscribe(data => params.api!.setRowData(data.filter((rec: any) => rec.country != null)));
    }
}



function getBoolean(id: string) {
    return !!(document.querySelector('#' + id) as HTMLInputElement).checked;
}
function getParams() {
    return {
        skipColumnGroupHeaders: getBoolean('columnGroups'),
        skipColumnHeaders: getBoolean('skipHeader'),
    };
}
