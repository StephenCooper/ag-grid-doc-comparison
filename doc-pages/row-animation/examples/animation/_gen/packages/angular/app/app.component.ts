
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div class="example-header">
        <div style="display: inline-block; height: 10px; margin-top: 5px; margin-right: 10px; width: 100px; border: 1px solid grey;">
            <div id="animationCountdown" class="transition-width" style="background-color: grey; height: 100%; width: 0%;"></div>
        </div>
        <span id="animationAction"></span>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [animateRows]="true"
    [suppressAggFuncInHeader]="true"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 150 },
    { field: 'country', minWidth: 150 },
    { field: 'year', minWidth: 120 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
];
public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
};
public autoGroupColumnDef: ColDef = {
    // to get 'athlete' showing in the leaf level in this column
    cellRenderer: 'agGroupCellRenderer',
    headerName: 'Athlete',
    minWidth: 200,
    field: 'athlete',
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    params.api!.setRowData(data.slice(0, 50));
    startInterval(params.api!, params.columnApi!);
});
    }
}



var countDownDirection = true;
// the code below executes an action every 2,000 milliseconds.
// it's an interval, and each time it runs, it takes the next action
// from the 'actions' list below
function startInterval(api: GridApi, columnApi: ColumnApi) {
    var actionIndex = 0;
    resetCountdown();
    executeAfterXSeconds();
    function executeAfterXSeconds() {
        setTimeout(function () {
            var action = getActions()[actionIndex];
            action(api, columnApi);
            actionIndex++;
            if (actionIndex >= getActions().length) {
                actionIndex = 0;
            }
            resetCountdown();
            executeAfterXSeconds();
        }, 3000);
    }
    setTitleFormatted(null);
}
function resetCountdown() {
    (document.querySelector('#animationCountdown') as any).style.width = countDownDirection
        ? '100%'
        : '0%';
    countDownDirection = !countDownDirection;
}
function setTitleFormatted(apiName: null | string, methodName?: string, paramsName?: string) {
    var html;
    if (apiName === null) {
        html = '<span class="code-highlight-yellow">command:> </span>';
    }
    else {
        html =
            '<span class="code-highlight-yellow">command:> </span> ' +
                '<span class="code-highlight-blue">' +
                apiName +
                '</span>' +
                '<span class="code-highlight-blue">.</span>' +
                '<span class="code-highlight-yellow">' +
                methodName +
                '</span>' +
                '<span class="code-highlight-blue"></span>' +
                '<span class="code-highlight-blue">(</span>' +
                '<span class="code-highlight-green">' +
                paramsName +
                '</span>' +
                '<span class="code-highlight-blue">)</span>';
    }
    document.querySelector('#animationAction')!.innerHTML = html;
}
function getActions() {
    return [
        function (api: GridApi, columnApi: ColumnApi) {
            columnApi.applyColumnState({
                state: [{ colId: 'country', sort: 'asc' }],
                defaultState: { sort: null },
            });
            setTitleFormatted('api', 'applyColumnState', "country: 'asc'");
        },
        function (api: GridApi, columnApi: ColumnApi) {
            columnApi.applyColumnState({
                state: [
                    { colId: 'year', sort: 'asc' },
                    { colId: 'country', sort: 'asc' },
                ],
                defaultState: { sort: null },
            });
            setTitleFormatted('api', 'applyColumnState', "year: 'asc', country 'asc'");
        },
        function (api: GridApi, columnApi: ColumnApi) {
            columnApi.applyColumnState({
                state: [
                    { colId: 'year', sort: 'asc' },
                    { colId: 'country', sort: 'desc' },
                ],
                defaultState: { sort: null },
            });
            setTitleFormatted('api', 'applyColumnState', "year: 'asc', country: 'desc'");
        },
        function (api: GridApi, columnApi: ColumnApi) {
            columnApi.applyColumnState({
                defaultState: { sort: null },
            });
            setTitleFormatted('api', 'applyColumnState', 'clear sort');
        },
    ];
}
