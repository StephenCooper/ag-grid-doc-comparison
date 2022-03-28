
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsParams, ServerSideStoreType, SetFilterValuesFuncParams } from 'ag-grid-community';
declare var FakeServer: any;

@Component({
    selector: 'my-app',
    template: `<div class="test-container">

    <div class="test-header">
        Select columns to show then hit 'Apply'
    </div>

    <div class="test-header">
        <label><input type="checkbox" id="athlete">Athlete</label>
        <label><input type="checkbox" id="age">Age</label>
        <label><input type="checkbox" id="country">Country</label>
        <label><input type="checkbox" id="year">Year</label>
        <label><input type="checkbox" id="sport">Sport</label>

        <label><input type="checkbox" id="gold">Gold</label>
        <label><input type="checkbox" id="silver">Silver</label>
        <label><input type="checkbox" id="bronze">Bronze</label>

        <button (click)="onBtApply()">Apply</button>
    </div>

    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [animateRows]="true"
    [suppressAggFuncInHeader]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>

</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    colDefAthlete,
    colDefAge,
    colDefCountry,
    colDefYear,
    colDefSport,
    colDefGold,
    colDefSilver,
    colDefBronze,
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
};
public autoGroupColumnDef: ColDef = {
    minWidth: 200,
};
public rowModelType = 'serverSide';
public serverSideStoreType: ServerSideStoreType = 'partial';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onBtApply() {
    var cols = [];
    if (getBooleanValue('#athlete')) {
        cols.push(colDefAthlete);
    }
    if (getBooleanValue('#age')) {
        cols.push(colDefAge);
    }
    if (getBooleanValue('#country')) {
        cols.push(colDefCountry);
    }
    if (getBooleanValue('#year')) {
        cols.push(colDefYear);
    }
    if (getBooleanValue('#sport')) {
        cols.push(colDefSport);
    }
    if (getBooleanValue('#gold')) {
        cols.push(colDefGold);
    }
    if (getBooleanValue('#silver')) {
        cols.push(colDefSilver);
    }
    if (getBooleanValue('#bronze')) {
        cols.push(colDefBronze);
    }
    this.gridApi.setColumnDefs(cols);
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        
    (document.getElementById('athlete') as HTMLInputElement).checked = true;
    (document.getElementById('age') as HTMLInputElement).checked = true;
    (document.getElementById('country') as HTMLInputElement).checked = true;
    (document.getElementById('year') as HTMLInputElement).checked = true;
    (document.getElementById('sport') as HTMLInputElement).checked = true;
    (document.getElementById('gold') as HTMLInputElement).checked = true;
    (document.getElementById('silver') as HTMLInputElement).checked = true;
    (document.getElementById('bronze') as HTMLInputElement).checked = true;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    // setup the fake server with entire dataset
    fakeServer = new FakeServer(data);
    // create datasource with a reference to the fake server
    var datasource: IServerSideDatasource = getServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api!.setServerSideDatasource(datasource);
});
    }
}



var colDefCountry: ColDef = { field: 'country', rowGroup: true };
var colDefYear: ColDef = { field: 'year', rowGroup: true };
var colDefAthlete: ColDef = {
    field: 'athlete',
    filter: 'agSetColumnFilter',
    filterParams: {
        values: getAthletesAsync,
    },
    menuTabs: ['filterMenuTab'],
};
var colDefAge: ColDef = { field: 'age' };
var colDefSport: ColDef = { field: 'sport' };
var colDefGold: ColDef = { field: 'gold', aggFunc: 'sum' };
var colDefSilver: ColDef = { field: 'silver', aggFunc: 'sum' };
var colDefBronze: ColDef = { field: 'bronze', aggFunc: 'sum' };
function getAthletesAsync(params: SetFilterValuesFuncParams) {
    var countries = fakeServer.getAthletes();
    // simulating real server call with a 500ms delay
    setTimeout(function () {
        params.success(countries);
    }, 500);
}
function getBooleanValue(cssSelector: string) {
    return (document.querySelector(cssSelector) as HTMLInputElement).checked === true;
}
function getServerSideDatasource(server: any): IServerSideDatasource {
    return {
        getRows: function (params: IServerSideGetRowsParams) {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            var response = server.getData(params.request);
            // adding delay to simulate real server call
            setTimeout(function () {
                if (response.success) {
                    // call the success callback
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    // inform the grid request failed
                    params.fail();
                }
            }, 200);
        },
    };
}
var fakeServer: any = undefined;
