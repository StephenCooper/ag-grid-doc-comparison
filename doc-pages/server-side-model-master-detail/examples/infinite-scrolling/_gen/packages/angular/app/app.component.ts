
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams, IServerSideDatasource, IServerSideGetRowsRequest, ServerSideStoreType } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div style="height: 100%; box-sizing: border-box;">
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [animateRows]="true"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [masterDetail]="true"
    [detailCellRendererParams]="detailCellRendererParams"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: 'accountId', cellRenderer: 'agGroupCellRenderer' },
    { field: 'name' },
    { field: 'country' },
    { field: 'calls' },
    { field: 'totalDuration' },
];
public defaultColDef: ColDef = {
    flex: 1,
};
public rowModelType = 'serverSide';
public serverSideStoreType: ServerSideStoreType = 'partial';
public detailCellRendererParams: any = {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode', minWidth: 150 },
            { field: 'number', minWidth: 180 },
        ],
        defaultColDef: {
            flex: 1,
        },
    },
    getDetailRowData: function (params) {
        // supply details records to detail cell renderer (i.e. detail grid)
        params.successCallback(params.data.callRecords);
    },
} as IDetailCellRendererParams;
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        
    setTimeout(function () {
        // expand some master row
        var someRow = params.api.getRowNode('1');
        if (someRow) {
            someRow.setExpanded(true);
        }
    }, 1000);

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/call-data.json').subscribe(data => {
    var server = getFakeServer(data);
    var datasource = getServerSideDatasource(server);
    params.api!.setServerSideDatasource(datasource);
});
    }
}



function getServerSideDatasource(server: any): IServerSideDatasource {
    return {
        getRows: function (params) {
            // adding delay to simulate real server call
            setTimeout(function () {
                var response = server.getResponse(params.request);
                if (response.success) {
                    // call the success callback
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    // inform the grid request failed
                    params.fail();
                }
            }, 500);
        },
    };
}
function getFakeServer(allData: any) {
    return {
        getResponse: function (request: IServerSideGetRowsRequest) {
            console.log('asking for rows: ' + request.startRow + ' to ' + request.endRow);
            // take a slice of the total rows
            var rowsThisPage = allData.slice(request.startRow, request.endRow);
            // if row count is known, it's possible to skip over blocks
            var lastRow = allData.length;
            return {
                success: true,
                rows: rowsThisPage,
                lastRow: lastRow,
            };
        },
    };
}
