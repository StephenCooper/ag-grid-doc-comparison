
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { AsyncTransactionsFlushed, ColDef, ColGroupDef, ColumnApi, GetRowIdFunc, Grid, GridApi, GridOptions, GridReadyEvent, IServerSideDatasource, IsApplyServerSideTransaction, ServerSideStoreType, ServerSideTransactionResult, ServerSideTransactionResultStatus } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
        <button (click)="onBtAdd()">Add</button>
        <button (click)="onBtRefresh()">Refresh</button>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [isApplyServerSideTransaction]="isApplyServerSideTransaction"
    [getRowId]="getRowId"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [{ field: 'product' }, { field: 'value' }];
public defaultColDef: ColDef = {
    width: 250,
    resizable: true,
};
public isApplyServerSideTransaction: IsApplyServerSideTransaction = function (params) {
    var tx = params.transaction as any;
    var storeInfo = params.storeInfo;
    var txCreatedSinceRowDataRead = tx.serverVersion > storeInfo.serverVersion;
    console.log('tx.serverVersion = ' +
        tx.serverVersion +
        ', storeInfo.serverVersion = ' +
        storeInfo.serverVersion);
    if (txCreatedSinceRowDataRead) {
        console.log('Applying transaction');
        return true;
    }
    else {
        console.log('Cancelling transaction');
        return false;
    }
};
public getRowId: GetRowIdFunc = function (params) {
    return params.data.product;
};
public rowModelType = 'serverSide';
public serverSideStoreType: ServerSideStoreType = 'full';
public rowData!: any[];


    onBtAdd() {
    var newProductName = all_products[Math.floor(all_products.length * Math.random())];
    var newItem = {
        product: newProductName + ' ' + newProductSequence++,
        value: Math.floor(Math.random() * 10000),
    };
    allServerSideData.push(newItem);
    serverVersion++;
    var tx = {
        add: [newItem],
        serverVersion: serverVersion,
    };
    this.gridApi.applyServerSideTransactionAsync(tx);
}

onBtRefresh() {
    this.gridApi.refreshServerSideStore({ purge: true });
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        
    setupData();
    var dataSource: IServerSideDatasource = {
        getRows: function (params2) {
            setTimeout(function () {
                var rowData = allServerSideData.slice();
                console.log('getRows: found ' + rowData.length + ' records on server.');
                params2.success({
                    rowData: rowData,
                    storeInfo: { serverVersion: serverVersion },
                });
            }, 2000);
        },
    };
    params.api.setServerSideDatasource(dataSource);

    }
}



var products = ['Palm Oil', 'Rubber', 'Wool', 'Amber', 'Copper'];
var newProductSequence = 0;
var all_products = [
    'Palm Oil',
    'Rubber',
    'Wool',
    'Amber',
    'Copper',
    'Lead',
    'Zinc',
    'Tin',
    'Aluminium',
    'Aluminium Alloy',
    'Nickel',
    'Cobalt',
    'Molybdenum',
    'Recycled Steel',
    'Corn',
    'Oats',
    'Rough Rice',
    'Soybeans',
    'Rapeseed',
    'Soybean Meal',
    'Soybean Oil',
    'Wheat',
    'Milk',
    'Coca',
    'Coffee C',
    'Cotton No.2',
    'Sugar No.11',
    'Sugar No.14',
];
var allServerSideData: any[] = [];
function setupData() {
    products.forEach(function (product, index) {
        allServerSideData.push({
            product: product,
            value: Math.floor(Math.random() * 10000),
        });
    });
}
var serverVersion = 0;
