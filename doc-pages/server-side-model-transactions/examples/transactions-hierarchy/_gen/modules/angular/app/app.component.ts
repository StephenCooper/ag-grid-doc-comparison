
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, GetRowIdFunc, GetServerSideStoreParamsParams, Grid, GridApi, GridOptions, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsParams, ServerSideStoreParams, ServerSideStoreType } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
        <button (click)="onBtNewPalmOil()">New Palm Oil</button>
        <button (click)="onBtNewRubber()">New Rubber</button>
        <button (click)="onBtNewWoolAmber()">New Wool &amp; Amber</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button (click)="onBtNewProduct()">New Product (will fail)</button>
        <button (click)="onBtStoreState()">Store State</button>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [getRowId]="getRowId"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [animateRows]="true"
    [purgeClosedRowNodes]="true"
    [getServerSideStoreParams]="getServerSideStoreParams"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'productName', rowGroup: true, hide: true },
    { field: 'tradeName' },
    { field: 'value' },
];
public defaultColDef: ColDef = {
    width: 250,
    resizable: true,
};
public getRowId: GetRowIdFunc = function (params) {
    return params.data.id;
};
public rowModelType = 'serverSide';
public serverSideStoreType: ServerSideStoreType = 'full';
public getServerSideStoreParams: (params: GetServerSideStoreParamsParams) => ServerSideStoreParams = function (params) {
    const type = params.level == 0 ? 'partial' : 'full';
    return {
        storeType: type,
    };
};
public rowData!: any[];


    onBtNewPalmOil() {
    const transaction = {
        route: ['Palm Oil'],
        add: [createOneTrade()],
    };
    const res = this.gridApi.applyServerSideTransaction(transaction);
    console.log('New Palm Oil, result = ' + (res && res.status));
}

onBtNewRubber() {
    const transaction = {
        route: ['Rubber'],
        add: [createOneTrade()],
    };
    const res = this.gridApi.applyServerSideTransaction(transaction);
    console.log('New Rubber, result = ' + (res && res.status));
}

onBtNewWoolAmber() {
    const transactions = [];
    transactions.push({
        route: ['Wool'],
        add: [createOneTrade()],
    });
    transactions.push({
        route: ['Amber'],
        add: [createOneTrade()],
    });
    const api = this.gridApi!;
    transactions.forEach(function (tx) {
        const res = api.applyServerSideTransaction(tx);
        console.log('New ' + tx.route[0] + ', result = ' + (res && res.status));
    });
}

onBtNewProduct() {
    const transaction = {
        route: [],
        add: [{ id: idSequence++, productName: 'Rice', trades: [] }],
    };
    const res = this.gridApi.applyServerSideTransaction(transaction);
    console.log('New Product, result = ' + (res && res.status));
}

onBtStoreState() {
    const storeState = this.gridApi.getServerSideStoreState();
    console.log('Store States:');
    storeState.forEach(function (state, index) {
        console.log(index +
            ' - ' +
            JSON.stringify(state).replace(/"/g, '').replace(/,/g, ', '));
    });
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        
    setupData();
    const dataSource: IServerSideDatasource = {
        getRows: function (params2: IServerSideGetRowsParams) {
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
                const doingTopLevel = params2.request.groupKeys.length == 0;
                if (doingTopLevel) {
                    params2.success({
                        rowData: products.slice(),
                        rowCount: products.length,
                    });
                }
                else {
                    const key = params2.request.groupKeys[0];
                    let foundProduct: any = undefined;
                    products.forEach(function (product) {
                        if (product.productName == key) {
                            foundProduct = product;
                        }
                    });
                    if (foundProduct) {
                        params2.success({ rowData: foundProduct.trades });
                    }
                    else {
                        params2.fail();
                    }
                }
            }, 2000);
        },
    };
    params.api.setServerSideDatasource(dataSource);

    }
}



const productsNames = ['Palm Oil', 'Rubber', 'Wool', 'Amber', 'Copper'];
const products: any[] = [];
let idSequence = 0;
function createOneTrade() {
    return {
        id: idSequence++,
        tradeName: 'TRD-' + Math.floor(Math.random() * 20000),
        value: Math.floor(Math.random() * 20000),
    };
}
function setupData() {
    productsNames.forEach(function (productName) {
        const product: any = { id: idSequence++, productName: productName, trades: [] };
        products.push(product);
        for (let i = 0; i < 2; i++) {
            product.trades.push(createOneTrade());
        }
    });
}
