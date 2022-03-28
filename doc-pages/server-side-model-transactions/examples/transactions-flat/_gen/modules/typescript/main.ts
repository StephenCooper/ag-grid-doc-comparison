import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, GetRowIdFunc, Grid, GridOptions, IServerSideDatasource, IServerSideGetRowsParams, ServerSideStoreType } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule])

const products = ['Palm Oil', 'Rubber', 'Wool', 'Amber', 'Copper'];
const all_products = [
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

const columnDefs: ColDef[] = [{ field: 'product' }, { field: 'value' }]

const gridOptions: GridOptions = {
    defaultColDef: {
        width: 250,
        resizable: true,
    },
    getRowId: function (params) {
        return params.data.product
    },
    rowSelection: 'multiple',
    serverSideStoreType: 'full',
    enableCellChangeFlash: true,
    columnDefs: columnDefs,
    // use the enterprise row model
    rowModelType: 'serverSide',
    // cacheBlockSize: 100,
    animateRows: true,
}

let newProductSequence = 0;
let valueCounter = 0;

function onRemoveSelected() {
    const rowsToRemove = gridOptions.api!.getSelectedRows();

    const tx = {
        remove: rowsToRemove,
    };

    gridOptions.api!.applyServerSideTransaction(tx)
}

function onRemoveRandom() {
    const rowsToRemove: any[] = [];
    let firstRow: any;

    gridOptions.api!.forEachNode(function (node) {
        if (firstRow == null) {
            firstRow = node.data
        }
        // skip half the nodes at random
        if (Math.random() < 0.75) {
            return
        }
        rowsToRemove.push(node.data)
    })

    if (rowsToRemove.length == 0 && firstRow != null) {
        rowsToRemove.push(firstRow)
    }

    const tx = {
        remove: rowsToRemove,
    };

    gridOptions.api!.applyServerSideTransaction(tx)
}

function onUpdateSelected() {
    const rowsToUpdate = gridOptions.api!.getSelectedRows();
    rowsToUpdate.forEach(function (data) {
        data.value = getNextValue()
    })

    const tx = {
        update: rowsToUpdate,
    };

    gridOptions.api!.applyServerSideTransaction(tx)
}

function onUpdateRandom() {
    const rowsToUpdate: any[] = [];

    gridOptions.api!.forEachNode(function (node) {
        // skip half the nodes at random
        if (Math.random() > 0.5) {
            return
        }
        const data = node.data;
        data.value = getNextValue()
        rowsToUpdate.push(data)
    })

    const tx = {
        update: rowsToUpdate,
    };

    gridOptions.api!.applyServerSideTransaction(tx)
}

function onAdd(index: number) {
    const newProductName =
        all_products[Math.floor(all_products.length * Math.random())];
    const itemsToAdd = [];
    for (let i = 0; i < 5; i++) {
        itemsToAdd.push({
            product: newProductName + ' ' + newProductSequence++,
            value: getNextValue(),
        })
    }
    const tx = {
        addIndex: index,
        add: itemsToAdd,
    };
    gridOptions.api!.applyServerSideTransaction(tx)
}

function getNextValue() {
    valueCounter++
    return Math.floor((valueCounter * 987654321) / 7) % 10000
}

// setup the grid after the page has finished loading
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
    new Grid(gridDiv, gridOptions)

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(response => response.json())
        .then(function (data) {
            const dataSource: IServerSideDatasource = {
                getRows: function (params: IServerSideGetRowsParams) {
                    // To make the demo look real, wait for 500ms before returning
                    setTimeout(function () {
                        const rows: any[] = [];
                        products.forEach(function (product, index) {
                            rows.push({
                                product: product,
                                value: getNextValue(),
                            })
                        })

                        // call the success callback
                        params.success({ rowData: rows, rowCount: rows.length })
                    }, 500)
                },
            };

            gridOptions.api!.setServerSideDatasource(dataSource)
        })

 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onRemoveSelected = onRemoveSelected;
 (<any>window).onRemoveRandom = onRemoveRandom;
 (<any>window).onUpdateSelected = onUpdateSelected;
 (<any>window).onUpdateRandom = onUpdateRandom;
 (<any>window).onAdd = onAdd;
}