
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="parent-div">

    <div class="api-panel">
        <div class="api-column">
            Visibility
            <button (click)="setSideBarVisible(true)">setSideBarVisible(true)</button>
            <button (click)="setSideBarVisible(false)">setSideBarVisible(false)</button>
            <button (click)="isSideBarVisible()">isSideBarVisible()</button>
        </div>
        <div class="api-column">
            Open &amp; Close
            <button (click)="openToolPanel('columns')">openToolPanel('columns')</button>
            <button (click)="openToolPanel('filters')">openToolPanel('filters')</button>
            <button (click)="closeToolPanel()">closeToolPanel()</button>
            <button (click)="getOpenedToolPanel()">getOpenedToolPanel()</button>
        </div>
        <div class="api-column">
            Reset
            <button (click)="setSideBar(['filters','columns'])">setSideBar(['filters','columns'])</button>
            <button (click)="setSideBar('columns')">setSideBar('columns')</button>
            <button (click)="getSideBar()">getSideBar()</button>
        </div>
        <div class="api-column">
            Position
            <button (click)="setSideBarPosition('left')">setSideBarPosition('left')</button>
            <button (click)="setSideBarPosition('right')">setSideBarPosition('right')</button>
        </div>
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

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', filter: 'agTextColumnFilter', minWidth: 200 },
    { field: 'age' },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'date', minWidth: 160 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    sortable: true,
    filter: true,
};
public sideBar: SideBarDef | string | boolean | null = {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
        },
        {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
        },
    ],
    defaultToolPanel: 'filters',
    hiddenByDefault: true,
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    setSideBarVisible(value: boolean) {
    this.gridApi.setSideBarVisible(value);
}

isSideBarVisible() {
    alert(this.gridApi.isSideBarVisible());
}

openToolPanel(key: string) {
    this.gridApi.openToolPanel(key);
}

closeToolPanel() {
    this.gridApi.closeToolPanel();
}

getOpenedToolPanel() {
    alert(this.gridApi.getOpenedToolPanel());
}

setSideBar(def: SideBarDef) {
    this.gridApi.setSideBar(def);
}

getSideBar() {
    var sideBar = this.gridApi.getSideBar();
    alert(JSON.stringify(sideBar));
    console.log(sideBar);
}

setSideBarPosition(position: 'left' | 'right') {
    this.gridApi.setSideBarPosition(position);
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




