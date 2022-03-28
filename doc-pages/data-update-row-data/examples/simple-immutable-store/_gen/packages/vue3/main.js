
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
                <div style="margin-bottom: 5px; min-height: 30px;">
                    <button v-on:click="reverseItems()">Reverse</button>
                    <button v-on:click="addFiveItems(true)">Append</button>
                    <button v-on:click="addFiveItems(false)">Prepend</button>
                    <button v-on:click="removeSelected()">Remove Selected</button>
                    <button v-on:click="updatePrices()">Update Prices</button>
                    <button id="groupingOn" v-on:click="onGroupingEnabled(true)">Grouping On</button>
                    <button id="groupingOff" v-on:click="onGroupingEnabled(false)">Grouping Off</button>
                    <span style="border: 1px solid lightgrey; margin-left: 20px; padding: 8px; white-space: nowrap; display: inline-block;">
                        Group:
                        <button v-on:click="setSelectedToGroup('A')">A</button>
                        <button v-on:click="setSelectedToGroup('B')">B</button>
                        <button v-on:click="setSelectedToGroup('C')">C</button>
                    </span>
                </div>
                <div style="flex: 1 1 0px;">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :animateRows="true"
                :rowSelection="rowSelection"
                :autoGroupColumnDef="autoGroupColumnDef"
                :statusBar="statusBar"
                :groupDefaultExpanded="groupDefaultExpanded"
                :rowData="rowData"
                :getRowId="getRowId"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Symbol",
field:"symbol"},{headerName:"Price",
field:"price"},{headerName:"Group",
field:"group"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    width: 250,
    sortable: true,
    resizable: true,
},
            rowSelection: null,
autoGroupColumnDef: null,
statusBar: null,
groupDefaultExpanded: null,
rowData: null,
getRowId: null
        }
    },
    created() {
        this.rowSelection = 'multiple';
this.autoGroupColumnDef = {
    headerName: 'Symbol',
    cellRenderer: 'agGroupCellRenderer',
    field: 'symbol',
};
this.statusBar = {"statusPanels":[{"statusPanel":"agAggregationComponent","align":"right"}]};
this.groupDefaultExpanded = 1;
this.rowData = immutableStore;
this.getRowId = (params) => {
    return params.data.symbol;
}
    },
    methods: {
        addFiveItems(append) {
    const newStore = immutableStore.slice();
    for (let i = 0; i < 5; i++) {
        const newItem = createItem();
        if (append) {
            newStore.push(newItem);
        }
        else {
            newStore.splice(0, 0, newItem);
        }
    }
    immutableStore = newStore;
    this.gridApi.setRowData(immutableStore);
},
removeSelected() {
    const selectedRowNodes = this.gridApi.getSelectedNodes();
    const selectedIds = selectedRowNodes.map(function (rowNode) {
        return rowNode.id;
    });
    immutableStore = immutableStore.filter(function (dataItem) {
        return selectedIds.indexOf(dataItem.symbol) < 0;
    });
    this.gridApi.setRowData(immutableStore);
},
setSelectedToGroup(newGroup) {
    const selectedRowNodes = this.gridApi.getSelectedNodes();
    const selectedIds = selectedRowNodes.map(function (rowNode) {
        return rowNode.id;
    });
    immutableStore = immutableStore.map(function (dataItem) {
        const itemSelected = selectedIds.indexOf(dataItem.symbol) >= 0;
        if (itemSelected) {
            return {
                // symbol and price stay the same
                symbol: dataItem.symbol,
                price: dataItem.price,
                // group gets the group
                group: newGroup,
            };
        }
        else {
            return dataItem;
        }
    });
    this.gridApi.setRowData(immutableStore);
},
updatePrices() {
    const newStore = [];
    immutableStore.forEach(function (item) {
        newStore.push({
            // use same symbol as last time, this is the unique id
            symbol: item.symbol,
            // group also stays the same
            group: item.group,
            // add random price
            price: Math.floor(Math.random() * 100),
        });
    });
    immutableStore = newStore;
    this.gridApi.setRowData(immutableStore);
},
onGroupingEnabled(enabled) {
    setGroupingEnabled(enabled, this.gridColumnApi);
},
reverseItems() {
    immutableStore.reverse();
    this.gridApi.setRowData(immutableStore);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
    immutableStore = [];
    immutableStore = getInitialData();
    params.api.setRowData(immutableStore);
    setGroupingEnabled(false, params.columnApi);

    },
    }
}

window.getInitialData = function getInitialData() {
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push(createItem());
    }
    return data;
}

window.filter = function filter(list, callback) {
    const filteredList = [];
    list.forEach(function (item) {
        if (callback(item)) {
            filteredList.push(item);
        }
    });
    return filteredList;
}

window.createItem = function createItem() {
    const item = {
        group: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
        symbol: createUniqueRandomSymbol(),
        price: Math.floor(Math.random() * 100),
    };
    return item;
}

window.setGroupingEnabled = function setGroupingEnabled(enabled, columnApi) {
    if (enabled) {
        columnApi.applyColumnState({
            state: [
                { colId: 'group', rowGroup: true, hide: true },
                { colId: 'symbol', hide: true },
            ],
        });
    }
    else {
        columnApi.applyColumnState({
            state: [
                { colId: 'group', rowGroup: false, hide: false },
                { colId: 'symbol', hide: false },
            ],
        });
    }
    setItemVisible('groupingOn', !enabled);
    setItemVisible('groupingOff', enabled);
}

window.setItemVisible = function setItemVisible(id, visible) {
    const element = document.querySelector('#' + id);
    element.style.display = visible ? 'inline' : 'none';
}

window.createUniqueRandomSymbol = // creates a unique symbol, eg 'ADG' or 'ZJD'
function createUniqueRandomSymbol() {
    let symbol;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let isUnique = false;
    while (!isUnique) {
        symbol = '';
        // create symbol
        for (let i = 0; i < 3; i++) {
            symbol += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        // check uniqueness
        isUnique = true;
        immutableStore.forEach(function (oldItem) {
            if (oldItem.symbol === symbol) {
                isUnique = false;
            }
        });
    }
    return symbol;
}

let immutableStore = [];

createApp(VueExample)
    .mount("#app")

