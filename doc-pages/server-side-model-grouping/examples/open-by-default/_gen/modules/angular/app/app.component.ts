
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, GetRowIdFunc, GetRowIdParams, GetServerSideStoreParamsParams, Grid, GridApi, GridOptions, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsParams, IsServerSideGroupOpenByDefaultParams, ServerSideStoreParams } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts
declare var FakeServer: any;

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
        <button (click)="onBtRouteOfSelected()">Route of Selected</button>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [getServerSideStoreParams]="getServerSideStoreParams"
    [rowModelType]="rowModelType"
    [rowSelection]="rowSelection"
    [suppressAggFuncInHeader]="true"
    [animateRows]="true"
    [getRowId]="getRowId"
    [isServerSideGroupOpenByDefault]="isServerSideGroupOpenByDefault"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'country', enableRowGroup: true, rowGroup: true, hide: true },
    { field: 'sport', enableRowGroup: true, rowGroup: true, hide: true },
    { field: 'year', minWidth: 100 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
};
public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 280,
};
public getServerSideStoreParams: (params: GetServerSideStoreParamsParams) => ServerSideStoreParams = function (params: GetServerSideStoreParamsParams) {
    var res: ServerSideStoreParams = {
        storeType: params.level == 0 ? 'partial' : 'full',
    };
    return res;
};
public rowModelType = 'serverSide';
public rowSelection = 'multiple';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onBtRouteOfSelected() {
    var selectedNodes = this.gridApi.getSelectedNodes();
    selectedNodes.forEach(function (rowNode, index) {
        var route = rowNode.getRoute();
        var routeString = route ? route.join(',') : undefined;
        console.log('#' + index + ', route = [' + routeString + ']');
    });
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    // setup the fake server with entire dataset
    var fakeServer = new FakeServer(data);
    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api!.setServerSideDatasource(datasource);
});
    }

getRowId(params: GetRowIdParams) {
    return Math.random().toString();
}

isServerSideGroupOpenByDefault(params: IsServerSideGroupOpenByDefaultParams) {
    var route = params.rowNode.getRoute();
    if (!route) {
        return false;
    }
    var routeAsString = route.join(',');
    var routesToOpenByDefault = [
        'Zimbabwe',
        'Zimbabwe,Swimming',
        'United States,Swimming',
    ];
    return routesToOpenByDefault.indexOf(routeAsString) >= 0;
}
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
            }, 400);
        },
    };
}
