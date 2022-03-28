
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'city', rowGroup: true, hide: true },
    { field: 'laptop', rowGroup: true, hide: true },
    { field: 'distro', sort: 'asc', comparator: myComparator },
    {
        field: 'value',
        enableCellChangeFlash: true,
        aggFunc: myAggFunc,
        filter: myFilter,
    },
],
    defaultColDef: {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true,
},
    rowSelection: 'multiple',
    autoGroupColumnDef: {
    field: 'name',
    cellRendererParams: { checkbox: true },
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    params.api.setFilterModel({
        value: { value: '50' },
    });
    timeOperation('Initialisation', function () {
        params.api.setRowData(getData());
    });
    params.api.getDisplayedRowAtIndex(2).setExpanded(true);
    params.api.getDisplayedRowAtIndex(4).setExpanded(true);

    }

onBtDuplicate = () => {
    const api = this.gridApi;
    // get the first child of the
    const selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
        console.log('No rows selected!');
        return;
    }
    const newItems = [];
    selectedRows.forEach(function (selectedRow) {
        idCounter++;
        const newItem = createDataItem(idCounter, selectedRow.name, selectedRow.distro, selectedRow.laptop, selectedRow.city, selectedRow.value);
        newItems.push(newItem);
    });
    timeOperation('Duplicate', function () {
        api.applyTransaction({ add: newItems });
    });
}

   onBtUpdate = () => {
    const api = this.gridApi;
    // get the first child of the
    const selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
        console.log('No rows selected!');
        return;
    }
    const updatedItems = [];
    selectedRows.forEach(function (oldItem) {
        const newValue = Math.floor(Math.random() * 100) + 10;
        const newItem = createDataItem(oldItem.id, oldItem.name, oldItem.distro, oldItem.laptop, oldItem.city, newValue);
        updatedItems.push(newItem);
    });
    timeOperation('Update', function () {
        api.applyTransaction({ update: updatedItems });
    });
}

   onBtDelete = () => {
    const api = this.gridApi;
    // get the first child of the
    const selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
        console.log('No rows selected!');
        return;
    }
    timeOperation('Delete', function () {
        api.applyTransaction({ remove: selectedRows });
    });
}

   onBtClearSelection = () => {
    this.gridApi.deselectAll();
}

   onBtUpdateModel = () => {
    const api = this.gridApi;
    timeOperation('Update Model', function () {
        api.refreshClientSideRowModel('filter');
    });
}

   getRowId = (params) => {
    return params.data.id;
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="test-container">
    <div className="test-header">
        <button onClick={() => this.onBtUpdate()}>Update</button>
        <button onClick={() => this.onBtDuplicate()}>Duplicate</button>
        <button onClick={() => this.onBtDelete()}>Delete</button>
        <button onClick={() => this.onBtClearSelection()}>Clear Selection</button>
        <button onClick={() => this.onBtUpdateModel()}>Update Model</button>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
getRowId={this.getRowId}
defaultColDef={this.state.defaultColDef}
suppressModelUpdateAfterUpdateTransaction={true}
rowSelection={this.state.rowSelection}
groupSelectsChildren={true}
animateRows={true}
suppressAggAtRootLevel={true}
suppressRowClickSelection={true}
autoGroupColumnDef={this.state.autoGroupColumnDef}
onGridReady={this.onGridReady}
            />
            </div>
</div>

            </div>
        );
    }
}

let aggCallCount = 0;
let compareCallCount = 0;
let filterCallCount = 0;
let idCounter = 0;
function myAggFunc(params) {
    aggCallCount++;
    let total = 0;
    for (let i = 0; i < params.values.length; i++) {
        total += params.values[i];
    }
    return total;
}
function myComparator(a, b) {
    compareCallCount++;
    return a < b ? -1 : 1;
}
function getMyFilter() {
    class MyFilter {
        init(params) {
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
            const value = parseInt(this.eInput.value);
            this.filterValue = isNaN(value) ? null : value;
        }
        setModel(model) {
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
        doesFilterPass(params) {
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
const myFilter = getMyFilter();
function timeOperation(name, operation) {
    aggCallCount = 0;
    compareCallCount = 0;
    filterCallCount = 0;
    const start = new Date().getTime();
    operation();
    const end = new Date().getTime();
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
function letter(i) {
    return 'abcdefghijklmnopqrstuvwxyz'.substring(i, i + 1);
}
function randomLetter() {
    return letter(Math.floor(Math.random() * 26 + 1));
}
function getData() {
    const myRowData = [];
    for (let i = 0; i < 10000; i++) {
        const name = 'Mr ' +
            randomLetter().toUpperCase() +
            ' ' +
            randomLetter().toUpperCase() +
            randomLetter() +
            randomLetter() +
            randomLetter() +
            randomLetter();
        const city = CITIES[i % CITIES.length];
        const distro = LINUX_DISTROS[i % LINUX_DISTROS.length] +
            ' v' +
            Math.floor(Math.random() * 100 + 1) / 10;
        const university = LAPTOPS[i % LAPTOPS.length];
        const value = Math.floor(Math.random() * 100) + 10; // between 10 and 110
        idCounter++;
        myRowData.push(createDataItem(idCounter, name, distro, university, city, value));
    }
    return myRowData;
}
function createDataItem(id, name, distro, laptop, city, value) {
    return {
        id: id,
        name: name,
        city: city,
        distro: distro,
        laptop: laptop,
        value: value,
    };
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
