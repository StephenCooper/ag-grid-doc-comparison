
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsRequest, ServerSideStoreType } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowBuffer]="rowBuffer"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [cacheBlockSize]="cacheBlockSize"
    [maxBlocksInCache]="maxBlocksInCache"
    [debug]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'id', maxWidth: 80 },
    { field: 'athlete', minWidth: 220 },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
};
public rowBuffer = 0;
public rowModelType = 'serverSide';
public serverSideStoreType: ServerSideStoreType = 'partial';
public cacheBlockSize = 50;
public maxBlocksInCache = 2;
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    // adding row id to data
    var idSequence = 0;
    data.forEach(function (item: any) {
        item.id = idSequence++;
    });
    // setup the fake server with entire dataset
    var fakeServer = createFakeServer(data);
    // create datasource with a reference to the fake server
    var datasource = createServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api!.setServerSideDatasource(datasource);
});
    }
}



function createServerSideDatasource(server: any): IServerSideDatasource {
    return {
        getRows: function (params) {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            // get data for request from our fake server
            var response = server.getData(params.request);
            // simulating real server call with a 500ms delay
            setTimeout(function () {
                if (response.success) {
                    // supply rows for requested block to grid
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    params.fail();
                }
            }, 1000);
        },
    };
}
function createFakeServer(allData: any[]) {
    return {
        getData: function (request: IServerSideGetRowsRequest) {
            // take a slice of the total rows for requested block
            var rowsForBlock = allData.slice(request.startRow, request.endRow);
            // here we are pretending we don't know the last row until we reach it!
            var lastRow = getLastRowIndex(request, rowsForBlock);
            return {
                success: true,
                rows: rowsForBlock,
                lastRow: lastRow,
            };
        },
    };
}
function getLastRowIndex(request: IServerSideGetRowsRequest, results: any[]) {
    if (!results)
        return undefined;
    var currentLastRow = (request.startRow || 0) + results.length;
    // if on or after the last block, work out the last row, otherwise return 'undefined'
    return currentLastRow < (request.endRow || 0) ? currentLastRow : undefined;
}
