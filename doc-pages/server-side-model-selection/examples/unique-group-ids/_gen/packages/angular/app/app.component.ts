
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, GetRowIdFunc, Grid, GridApi, GridOptions, GridReadyEvent, IServerSideDatasource, ServerSideStoreType } from 'ag-grid-community';
declare var FakeServer: any;

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [getRowId]="getRowId"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [rowSelection]="rowSelection"
    [suppressAggFuncInHeader]="true"
    [animateRows]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'sport', rowGroup: true, hide: true },
    { headerName: 'Row ID', valueGetter: 'node.id', sortable: false },
    { field: 'gold', aggFunc: 'sum' }
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
    field: 'athlete',
};
public getRowId: GetRowIdFunc = params => {
    // if leaf level, we have ID
    if (params.data.id != null) {
        return params.data.id;
    }
    // this array will contain items that will compose the unique key
    var parts = [];
    // if parent groups, add the value for the parent group
    if (params.parentKeys) {
        parts.push(...params.parentKeys);
    }
    // it we are a group, add the value for this level's group
    var rowGroupCols = params.columnApi.getRowGroupColumns();
    var thisGroupCol = rowGroupCols[params.level];
    if (thisGroupCol) {
        parts.push(params.data[thisGroupCol.getColDef().field!]);
    }
    return parts.join('-');
};
public rowModelType = 'serverSide';
public serverSideStoreType: ServerSideStoreType = 'partial';
public rowSelection = 'multiple';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    // give an ID to each piece of row data
    data.forEach((item: any, index: number) => item.id = index);
    // setup the fake server with entire dataset
    var fakeServer = new FakeServer(data);
    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api!.setServerSideDatasource(datasource);
});
    }
}



function getServerSideDatasource(server: any): IServerSideDatasource {
    return {
        getRows: function (params) {
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
            }, 300);
        },
    };
}
