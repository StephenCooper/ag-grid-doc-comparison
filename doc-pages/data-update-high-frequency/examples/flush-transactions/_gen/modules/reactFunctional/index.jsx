
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])

// defined and updated in data.js
var UPDATE_COUNT = 20;

const numberCellFormatter = (params) => {
    return Math.floor(params.value)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const startFeed = (api) => {
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
const copyObject = (object) => {
    // start with new object
    var newObject = {};
    // copy in the old values
    Object.keys(object).forEach(function (key) {
        newObject[key] = object[key];
    });
    return newObject;
}



const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
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
]);
    const getRowId = useCallback(function (params) {
    return params.data.trade;
}, []);
    const defaultColDef = useMemo(() => { return {
    width: 120,
    sortable: true,
    resizable: true,
} }, []);
    const autoGroupColumnDef = useMemo(() => { return {
    width: 250,
} }, []);


            const onGridReady = useCallback((params) => {
                
    getData();
    setRowData(globalRowData);
    startFeed(params.api);

            }, []);

const onFlushTransactions = useCallback(() => {
    gridRef.current.api.flushAsyncTransactions();
}, [])


    return  (
            <div style={containerStyle}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px"}}>
        <button onClick={onFlushTransactions}>Flush Transactions</button>
        <span id="eMessage"></span>
    </div>
    
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
suppressAggFuncInHeader={true}
animateRows={true}
rowGroupPanelShow={'always'}
pivotPanelShow={'always'}
asyncTransactionWaitMillis={4000}
getRowId={getRowId}
defaultColDef={defaultColDef}
autoGroupColumnDef={autoGroupColumnDef}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
</div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
