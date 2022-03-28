
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, GetRowIdFunc, GetRowIdParams, Grid, GridApi, GridOptions, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsParams, ServerSideStoreType } from 'ag-grid-community';
declare var window: any;

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
        <button (click)="onBtAdd()">Add Before Selected Row</button>
        <button (click)="onBtRemove()">Remove Selected Row</button>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowSelection]="rowSelection"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [getRowId]="getRowId"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', width: 150 },
    { field: 'age' },
    { field: 'country', width: 150 },
    { field: 'year' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
];
public defaultColDef: ColDef = {
    width: 100,
    resizable: true,
};
public rowSelection = 'single';
public rowModelType = 'serverSide';
public serverSideStoreType: ServerSideStoreType = 'partial';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onBtRemove() {
    var selectedRows = this.gridApi.getSelectedNodes();
    if (!selectedRows || selectedRows.length === 0) {
        return;
    }
    var selectedRow = selectedRows[0];
    var indexToRemove = window.rowDataServerSide.indexOf(selectedRow.data);
    // the record could be missing, if the user hit the 'remove' button a few times before refresh happens
    if (indexToRemove >= 0) {
        window.rowDataServerSide.splice(indexToRemove, 1);
    }
    this.gridApi.refreshServerSideStore();
}

onBtAdd() {
    var selectedRows = this.gridApi.getSelectedNodes();
    if (!selectedRows || selectedRows.length === 0) {
        return;
    }
    var selectedRow = selectedRows[0];
    // insert new row in the source data, at the top of the page
    window.rowDataServerSide.splice(selectedRow.rowIndex, 0, {
        athlete: 'New Item' + newItemCount,
        id: '' + Math.random()
    });
    newItemCount++;
    this.gridApi.refreshServerSideStore();
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    // add id to data
    let idSequence = 0;
    data.forEach(function (item: any) {
        item.id = idSequence++;
    });
    var datasource = createMyDataSource(data);
    params.api!.setServerSideDatasource(datasource);
});
    }

getRowId(params: GetRowIdParams) {
    return params.data.id;
}
}



var newItemCount = 0;
function createMyDataSource(data: any[]) {
    window.rowDataServerSide = data;
    const dataSource: IServerSideDatasource = {
        getRows: function (params: IServerSideGetRowsParams) {
            setTimeout(function () {
                // take a slice of the total rows
                var rowsThisPage = data.slice(params.request.startRow, params.request.endRow);
                // call the success callback
                params.success({
                    rowData: rowsThisPage,
                    rowCount: window.rowDataServerSide.length,
                });
            }, 500);
        }
    };
    return dataSource;
}
