
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onAdd()">Add at End</button>
                    <button v-on:click="onAdd(0)">Add at Start</button>
                    <button v-on:click="onUpdateSelected()">Update Selected</button>
                    <button v-on:click="onUpdateRandom()">Update Random</button>
                    <button v-on:click="onRemoveSelected()">Remove Selected</button>
                    <button v-on:click="onRemoveRandom()">Remove Random</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :getRowId="getRowId"
                :rowSelection="rowSelection"
                :serverSideStoreType="serverSideStoreType"
                :enableCellChangeFlash="true"
                :rowModelType="rowModelType"
                :animateRows="true"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"product"},{field:"value"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    width: 250,
    resizable: true,
},
            getRowId: null,
rowSelection: null,
serverSideStoreType: null,
rowModelType: null
        }
    },
    created() {
        this.getRowId = (params) => {
    return params.data.product;
};
this.rowSelection = 'multiple';
this.serverSideStoreType = 'full';
this.rowModelType = 'serverSide'
    },
    methods: {
        onRemoveSelected() {
    const rowsToRemove = this.gridApi.getSelectedRows();
    const tx = {
        remove: rowsToRemove,
    };
    this.gridApi.applyServerSideTransaction(tx);
},
onRemoveRandom() {
    const rowsToRemove = [];
    let firstRow;
    this.gridApi.forEachNode(function (node) {
        if (firstRow == null) {
            firstRow = node.data;
        }
        // skip half the nodes at random
        if (Math.random() < 0.75) {
            return;
        }
        rowsToRemove.push(node.data);
    });
    if (rowsToRemove.length == 0 && firstRow != null) {
        rowsToRemove.push(firstRow);
    }
    const tx = {
        remove: rowsToRemove,
    };
    this.gridApi.applyServerSideTransaction(tx);
},
onUpdateSelected() {
    const rowsToUpdate = this.gridApi.getSelectedRows();
    rowsToUpdate.forEach(function (data) {
        data.value = getNextValue();
    });
    const tx = {
        update: rowsToUpdate,
    };
    this.gridApi.applyServerSideTransaction(tx);
},
onUpdateRandom() {
    const rowsToUpdate = [];
    this.gridApi.forEachNode(function (node) {
        // skip half the nodes at random
        if (Math.random() > 0.5) {
            return;
        }
        const data = node.data;
        data.value = getNextValue();
        rowsToUpdate.push(data);
    });
    const tx = {
        update: rowsToUpdate,
    };
    this.gridApi.applyServerSideTransaction(tx);
},
onAdd(index) {
    const newProductName = all_products[Math.floor(all_products.length * Math.random())];
    const itemsToAdd = [];
    for (let i = 0; i < 5; i++) {
        itemsToAdd.push({
            product: newProductName + ' ' + newProductSequence++,
            value: getNextValue(),
        });
    }
    const tx = {
        addIndex: index,
        add: itemsToAdd,
    };
    this.gridApi.applyServerSideTransaction(tx);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    const dataSource = {
        getRows: function (params) {
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
                const rows = [];
                products.forEach(function (product, index) {
                    rows.push({
                        product: product,
                        value: getNextValue(),
                    });
                });
                // call the success callback
                params.success({ rowData: rows, rowCount: rows.length });
            }, 500);
        },
    };
    params.api.setServerSideDatasource(dataSource);
};
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

window.getNextValue = function getNextValue() {
    valueCounter++;
    return Math.floor((valueCounter * 987654321) / 7) % 10000;
}

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

let newProductSequence = 0;

let valueCounter = 0;

createApp(VueExample)
    .mount("#app")

