
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, IFiltersToolPanel, SideBarDef } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div>
        <span class="button-group">
            <button (click)="setCustomSortLayout()">Custom Sort Layout</button>
            <button (click)="setCustomGroupLayout()">Custom Group Layout</button>
        </span>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [sideBar]="sideBar"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: (ColDef | ColGroupDef)[] = [
    {
        headerName: 'Athlete',
        children: [
            {
                headerName: 'Name',
                field: 'athlete',
                minWidth: 200,
                filter: 'agTextColumnFilter',
            },
            { field: 'age' },
            { field: 'country', minWidth: 200 },
        ],
    },
    {
        headerName: 'Competition',
        children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
    },
    { colId: 'sport', field: 'sport', minWidth: 200 },
    {
        headerName: 'Medals',
        children: [
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
        ],
    },
];
public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
};
public sideBar: SideBarDef | string | boolean | null = {
    toolPanels: [
        {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
            toolPanelParams: {
                suppressExpandAll: false,
                suppressFilterSearch: false,
                // prevents custom layout changing when columns are reordered in the grid
                suppressSyncLayoutWithGrid: true,
            },
        },
    ],
    defaultToolPanel: 'filters',
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    setCustomSortLayout() {
    var filtersToolPanel = this.gridApi.getToolPanelInstance('filters') as any as IFiltersToolPanel;
    filtersToolPanel!.setFilterLayout(sortedToolPanelColumnDefs);
}

setCustomGroupLayout() {
    var filtersToolPanel = this.gridApi.getToolPanelInstance('filters') as any as IFiltersToolPanel;
    filtersToolPanel!.setFilterLayout(customToolPanelColumnDefs);
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}



var sortedToolPanelColumnDefs = [
    {
        headerName: 'Athlete',
        children: [
            { field: 'age' },
            { field: 'country' },
            { headerName: 'Name', field: 'athlete' },
        ],
    },
    {
        headerName: 'Competition',
        children: [{ field: 'date' }, { field: 'year' }],
    },
    {
        headerName: 'Medals',
        children: [
            { field: 'bronze' },
            { field: 'gold' },
            { field: 'silver' },
            { field: 'total' },
        ],
    },
    { colId: 'sport', field: 'sport', width: 110 },
];
var customToolPanelColumnDefs = [
    {
        headerName: 'Dummy Group 1',
        children: [
            { field: 'age' },
            { headerName: 'Name', field: 'athlete' },
            {
                headerName: 'Dummy Group 2',
                children: [{ colId: 'sport' }, { field: 'country' }],
            },
        ],
    },
    {
        headerName: 'Medals',
        children: [
            { field: 'total' },
            { field: 'bronze' },
            {
                headerName: 'Dummy Group 3',
                children: [{ field: 'silver' }, { field: 'gold' }],
            },
        ],
    },
];
