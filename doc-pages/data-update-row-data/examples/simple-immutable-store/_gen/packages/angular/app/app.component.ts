
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, GetRowIdFunc, Grid, GridApi, GridOptions, GridReadyEvent, StatusPanelDef } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
    <div style="margin-bottom: 5px; min-height: 30px;">
        <button (click)="reverseItems()">Reverse</button>
        <button (click)="addFiveItems(true)">Append</button>
        <button (click)="addFiveItems(false)">Prepend</button>
        <button (click)="removeSelected()">Remove Selected</button>
        <button (click)="updatePrices()">Update Prices</button>

        <button id="groupingOn" (click)="onGroupingEnabled(true)">Grouping On</button>
        <button id="groupingOff" (click)="onGroupingEnabled(false)">Grouping Off</button>
        <span style="border: 1px solid lightgrey; margin-left: 20px; padding: 8px; white-space: nowrap; display: inline-block;">
            Group:
            <button (click)="setSelectedToGroup('A')">A</button>
            <button (click)="setSelectedToGroup('B')">B</button>
            <button (click)="setSelectedToGroup('C')">C</button>
        </span>
    </div>
    <div style="flex: 1 1 0px;">
        <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [animateRows]="true"
    [rowSelection]="rowSelection"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [statusBar]="statusBar"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [rowData]="rowData"
    [getRowId]="getRowId"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    </div>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;
    private gridColumnApi!: ColumnApi;

    
    public columnDefs: ColDef[] = [
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Group', field: 'group' },
];
public defaultColDef: ColDef = {
    width: 250,
    sortable: true,
    resizable: true,
};
public rowSelection = 'multiple';
public autoGroupColumnDef: ColDef = {
    headerName: 'Symbol',
    cellRenderer: 'agGroupCellRenderer',
    field: 'symbol',
};
public statusBar: {
        statusPanels: StatusPanelDef[];
    } = {
    statusPanels: [{ statusPanel: 'agAggregationComponent', align: 'right' }],
};
public groupDefaultExpanded = 1;
public rowData: any[] | null = immutableStore;
public getRowId: GetRowIdFunc = function (params) {
    return params.data.symbol;
}


    addFiveItems(append: boolean) {
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
}

removeSelected() {
    const selectedRowNodes = this.gridApi.getSelectedNodes();
    const selectedIds = selectedRowNodes.map(function (rowNode) {
        return rowNode.id;
    });
    immutableStore = immutableStore.filter(function (dataItem) {
        return selectedIds.indexOf(dataItem.symbol) < 0;
    });
    this.gridApi.setRowData(immutableStore);
}

setSelectedToGroup(newGroup: string) {
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
}

updatePrices() {
    const newStore: any[] = [];
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
}

onGroupingEnabled(enabled: boolean) {
    setGroupingEnabled(enabled, this.gridColumnApi!);
}

reverseItems() {
    immutableStore.reverse();
    this.gridApi.setRowData(immutableStore);
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;this.gridColumnApi = params.columnApi;

        
    immutableStore = [];
    immutableStore = getInitialData();
    params.api.setRowData(immutableStore);
    setGroupingEnabled(false, params.columnApi);

    }
}



function getInitialData() {
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push(createItem());
    }
    return data;
}
let immutableStore: any[] = [];
function filter(list: any[], callback: any) {
    const filteredList: any[] = [];
    list.forEach(function (item) {
        if (callback(item)) {
            filteredList.push(item);
        }
    });
    return filteredList;
}
function createItem() {
    const item = {
        group: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
        symbol: createUniqueRandomSymbol(),
        price: Math.floor(Math.random() * 100),
    };
    return item;
}
function setGroupingEnabled(enabled: boolean, columnApi: ColumnApi) {
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
function setItemVisible(id: string, visible: boolean) {
    const element = document.querySelector('#' + id)! as any;
    element.style.display = visible ? 'inline' : 'none';
}
// creates a unique symbol, eg 'ADG' or 'ZJD'
function createUniqueRandomSymbol() {
    let symbol: any;
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
