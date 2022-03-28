
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
    // these are the row groups, so they are all hidden (they are show in the group column)
    {
        headerName: 'Product',
        field: 'product',
        enableRowGroup: true,
        enablePivot: true,
        rowGroupIndex: 0,
        hide: true,
    },
    {
        headerName: 'Portfolio',
        field: 'portfolio',
        enableRowGroup: true,
        enablePivot: true,
        rowGroupIndex: 1,
        hide: true,
    },
    {
        headerName: 'Book',
        field: 'book',
        enableRowGroup: true,
        enablePivot: true,
        rowGroupIndex: 2,
        hide: true,
    },
    { headerName: 'Trade', field: 'trade', width: 100 },
    // all the other columns (visible and not grouped)
    {
        headerName: 'Current',
        field: 'current',
        width: 200,
        aggFunc: 'sum',
        enableValue: true,
        cellClass: 'number',
        valueFormatter: numberCellFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        headerName: 'Previous',
        field: 'previous',
        width: 200,
        aggFunc: 'sum',
        enableValue: true,
        cellClass: 'number',
        valueFormatter: numberCellFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        headerName: 'Deal Type',
        field: 'dealType',
        enableRowGroup: true,
        enablePivot: true,
    },
    {
        headerName: 'Bid',
        field: 'bidFlag',
        enableRowGroup: true,
        enablePivot: true,
        width: 100,
    },
    {
        headerName: 'PL 1',
        field: 'pl1',
        width: 200,
        aggFunc: 'sum',
        enableValue: true,
        cellClass: 'number',
        valueFormatter: numberCellFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        headerName: 'PL 2',
        field: 'pl2',
        width: 200,
        aggFunc: 'sum',
        enableValue: true,
        cellClass: 'number',
        valueFormatter: numberCellFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        headerName: 'Gain-DX',
        field: 'gainDx',
        width: 200,
        aggFunc: 'sum',
        enableValue: true,
        cellClass: 'number',
        valueFormatter: numberCellFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        headerName: 'SX / PX',
        field: 'sxPx',
        width: 200,
        aggFunc: 'sum',
        enableValue: true,
        cellClass: 'number',
        valueFormatter: numberCellFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        headerName: '99 Out',
        field: '_99Out',
        width: 200,
        aggFunc: 'sum',
        enableValue: true,
        cellClass: 'number',
        valueFormatter: numberCellFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        headerName: 'Submitter ID',
        field: 'submitterID',
        width: 200,
        aggFunc: 'sum',
        enableValue: true,
        cellClass: 'number',
        valueFormatter: numberCellFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        headerName: 'Submitted Deal ID',
        field: 'submitterDealID',
        width: 200,
        aggFunc: 'sum',
        enableValue: true,
        cellClass: 'number',
        valueFormatter: numberCellFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
],
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    asyncTransactionWaitMillis: 4000,
    getRowId: function (params) {
    return params.data.trade;
},
    defaultColDef: {
    width: 120,
    sortable: true,
    resizable: true,
},
    autoGroupColumnDef: {
    width: 250,
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    getData();
    params.api.setRowData(globalRowData);
    startFeed(params.api);

    }

onFlushTransactions = () => {
    this.gridApi.flushAsyncTransactions();
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px"}}>
        <button onClick={() => this.onFlushTransactions()}>Flush Transactions</button>
        <span id="eMessage"></span>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
suppressAggFuncInHeader={true}
animateRows={true}
rowGroupPanelShow={this.state.rowGroupPanelShow}
pivotPanelShow={this.state.pivotPanelShow}
asyncTransactionWaitMillis={this.state.asyncTransactionWaitMillis}
getRowId={this.state.getRowId}
defaultColDef={this.state.defaultColDef}
autoGroupColumnDef={this.state.autoGroupColumnDef}
onGridReady={this.onGridReady}
            />
            </div>
</div>

            </div>
        );
    }
}

// defined and updated in data.js
var UPDATE_COUNT = 20;
function numberCellFormatter(params) {
    return Math.floor(params.value)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function startFeed(api) {
    var count = 1;
    setInterval(function () {
        var thisCount = count++;
        var updatedIndexes = {};
        var newItems = [];
        for (var i = 0; i < UPDATE_COUNT; i++) {
            // pick one index at random
            var index = Math.floor(Math.random() * globalRowData.length);
            // dont do same index twice, otherwise two updates for same row in one transaction
            if (updatedIndexes[index]) {
                continue;
            }
            var itemToUpdate = globalRowData[index];
            var newItem = copyObject(itemToUpdate);
            // copy previous to current value
            newItem.previous = newItem.current;
            // then create new current value
            newItem.current = Math.floor(Math.random() * 100000) + 100;
            newItems.push(newItem);
        }
        var resultCallback = function () {
            console.log('transactionApplied() - ' + thisCount);
        };
        api.applyTransactionAsync({ update: newItems }, resultCallback);
        console.log('applyTransactionAsync() - ' + thisCount);
    }, 500);
}
// makes a copy of the original and merges in the new values
function copyObject(object) {
    // start with new object
    var newObject = {};
    // copy in the old values
    Object.keys(object).forEach(function (key) {
        newObject[key] = object[key];
    });
    return newObject;
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
