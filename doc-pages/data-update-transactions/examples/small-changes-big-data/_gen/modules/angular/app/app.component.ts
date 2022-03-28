
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, GetRowIdFunc, GetRowIdParams, Grid, GridApi, GridOptions, GridReadyEvent, IAggFuncParams, IDoesFilterPassParams, IFilterComp, IFilterParams, IFilterType } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts
declare var LINUX_DISTROS: string[];
declare var CITIES: string[];
declare var LAPTOPS: string[];

@Component({
    selector: 'my-app',
    template: `<div class="test-container">
    <div class="test-header">
        <button (click)="onBtUpdate()">Update</button>
        <button (click)="onBtDuplicate()">Duplicate</button>
        <button (click)="onBtDelete()">Delete</button>
        <button (click)="onBtClearSelection()">Clear Selection</button>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [getRowId]="getRowId"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowSelection]="rowSelection"
    [groupSelectsChildren]="true"
    [animateRows]="true"
    [suppressAggAtRootLevel]="true"
    [suppressRowClickSelection]="true"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: "city", rowGroup: true, hide: true, },
    { field: 'laptop', rowGroup: true, hide: true, },
    { field: 'distro', sort: 'asc', comparator: myComparator },
    { field: 'value', enableCellChangeFlash: true, aggFunc: myAggFunc, filter: myFilter }
];
public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true,
};
public rowSelection = 'multiple';
public autoGroupColumnDef: ColDef = {
    field: 'name',
    cellRendererParams: { checkbox: true },
};
public rowData!: any[];


    onBtDuplicate() {
    var api = this.gridApi!;
    // get the first child of the
    var selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
        console.log('No rows selected!');
        return;
    }
    var newItems: any = [];
    selectedRows.forEach(function (selectedRow) {
        idCounter++;
        var newItem = createDataItem(idCounter, selectedRow.name, selectedRow.distro, selectedRow.laptop, selectedRow.city, selectedRow.value);
        newItems.push(newItem);
    });
    timeOperation('Duplicate', function () {
        api.applyTransaction({ add: newItems });
    });
}

onBtUpdate() {
    var api = this.gridApi!;
    // get the first child of the
    var selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
        console.log('No rows selected!');
        return;
    }
    var updatedItems: any[] = [];
    selectedRows.forEach(function (oldItem) {
        var newValue = Math.floor(Math.random() * 100) + 10;
        var newItem = createDataItem(oldItem.id, oldItem.name, oldItem.distro, oldItem.laptop, oldItem.city, newValue);
        updatedItems.push(newItem);
    });
    timeOperation('Update', function () {
        api.applyTransaction({ update: updatedItems });
    });
}

onBtDelete() {
    var api = this.gridApi!;
    // get the first child of the
    var selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
        console.log('No rows selected!');
        return;
    }
    timeOperation('Delete', function () {
        api.applyTransaction({ remove: selectedRows });
    });
}

onBtClearSelection() {
    this.gridApi.deselectAll();
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        
    params.api.setFilterModel({
        value: { value: '50' },
    });
    timeOperation('Initialisation', function () {
        params.api.setRowData(getData());
    });
    params.api.getDisplayedRowAtIndex(2)!.setExpanded(true);
    params.api.getDisplayedRowAtIndex(4)!.setExpanded(true);

    }

getRowId(params: GetRowIdParams) {
    return params.data.id;
}
}



var aggCallCount = 0;
var compareCallCount = 0;
var filterCallCount = 0;
var idCounter = 0;
function myAggFunc(params: IAggFuncParams) {
    aggCallCount++;
    var total = 0;
    for (var i = 0; i < params.values.length; i++) {
        total += params.values[i];
    }
    return total;
}
function myComparator(a: any, b: any) {
    compareCallCount++;
    return a < b ? -1 : 1;
}
function getMyFilter(): IFilterType {
    class MyFilter implements IFilterComp {
        filterParams!: IFilterParams;
        filterValue!: number | null;
        eGui: any;
        eInput: any;
        init(params: IFilterParams) {
            this.filterParams = params;
            this.filterValue = null;
            this.eGui = document.createElement('div');
            this.eGui.innerHTML = '<div>Greater Than: <input type="text"/></div>';
            this.eInput = this.eGui.querySelector('input');
            this.eInput.addEventListener('input', () => {
                this.getValueFromInput();
                params.filterChangedCallback();
            });
        }
        getGui() {
            return this.eGui;
        }
        getValueFromInput() {
            var value = parseInt(this.eInput.value);
            this.filterValue = isNaN(value) ? null : value;
        }
        setModel(model: any) {
            this.eInput.value = model == null ? null : model.value;
            this.getValueFromInput();
        }
        getModel() {
            if (!this.isFilterActive()) {
                return null;
            }
            return { value: this.eInput.value };
        }
        isFilterActive() {
            return this.filterValue !== null;
        }
        doesFilterPass(params: IDoesFilterPassParams) {
            filterCallCount++;
            const { api, colDef, column, columnApi, context } = this.filterParams;
            const { node } = params;
            const value = this.filterParams.valueGetter({
                api,
                colDef,
                column,
                columnApi,
                context,
                data: node.data,
                getValue: (field) => node.data[field],
                node,
            });
            return value > (this.filterValue || 0);
        }
    }
    return MyFilter;
}
var myFilter = getMyFilter();
function timeOperation(name: string, operation: any) {
    aggCallCount = 0;
    compareCallCount = 0;
    filterCallCount = 0;
    var start = new Date().getTime();
    operation();
    var end = new Date().getTime();
    console.log(name +
        ' finished in ' +
        (end - start) +
        'ms, aggCallCount = ' +
        aggCallCount +
        ', compareCallCount = ' +
        compareCallCount +
        ', filterCallCount = ' +
        filterCallCount);
}
function letter(i: number) {
    return 'abcdefghijklmnopqrstuvwxyz'.substring(i, i + 1);
}
function randomLetter() {
    return letter(Math.floor(Math.random() * 26 + 1));
}
function getData() {
    var myRowData = [];
    for (var i = 0; i < 10000; i++) {
        var name = 'Mr ' +
            randomLetter().toUpperCase() +
            ' ' +
            randomLetter().toUpperCase() +
            randomLetter() +
            randomLetter() +
            randomLetter() +
            randomLetter();
        var city = CITIES[i % CITIES.length];
        var distro = LINUX_DISTROS[i % LINUX_DISTROS.length] +
            ' v' +
            Math.floor(Math.random() * 100 + 1) / 10;
        var university = LAPTOPS[i % LAPTOPS.length];
        var value = Math.floor(Math.random() * 100) + 10; // between 10 and 110
        idCounter++;
        myRowData.push(createDataItem(idCounter, name, distro, university, city, value));
    }
    return myRowData;
}
function createDataItem(id: any, name: any, distro: any, laptop: any, city: any, value: any): any {
    return {
        id: id,
        name: name,
        city: city,
        distro: distro,
        laptop: laptop,
        value: value,
    };
}
