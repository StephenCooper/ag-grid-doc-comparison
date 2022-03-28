
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams, IServerSideDatasource, RowHeightParams, ServerSideStoreType } from 'ag-grid-community';
declare var FakeServer: any;

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
    [getRowHeight]="getRowHeight"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: 'accountId', maxWidth: 200, cellRenderer: 'agGroupCellRenderer' },
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
            { field: 'switchCode' },
            { field: 'number' },
        ],
        domLayout: 'autoHeight',
        defaultColDef: {
            flex: 1,
        },
    },
    getDetailRowData: function (params) {
        // supply details records to detail cell renderer (i.e. detail grid)
        params.successCallback(params.data.callRecords);
    },
} as IDetailCellRendererParams;
public getRowHeight: (params: RowHeightParams) => number | undefined | null = function (params) {
    if (params.node && params.node.detail) {
        var offset = 60;
        var sizes = params.api.getSizesForCurrentTheme() || {};
        var allDetailRowHeight = params.data.callRecords.length * sizes.rowHeight;
        return allDetailRowHeight + (sizes.headerHeight || 0) + offset;
    }
};
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
            }, 200);
        },
    };
}
