
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    // do NOT hide this column, it's needed for editing
    { field: 'group', rowGroup: true, editable: true },
    { field: 'a', type: 'valueColumn' },
    { field: 'b', type: 'valueColumn' },
    { field: 'c', type: 'valueColumn' },
    { field: 'd', type: 'valueColumn' },
    {
        headerName: 'Total',
        type: 'totalColumn',
        // we use getValue() instead of data.a so that it gets the aggregated values at the group level
        valueGetter: 'getValue("a") + getValue("b") + getValue("c") + getValue("d")',
    },
],
    defaultColDef: {
    flex: 1,
    sortable: true,
    filter: true,
},
    autoGroupColumnDef: {
    minWidth: 100,
},
    columnTypes: {
    valueColumn: {
        editable: true,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellClass: 'number-cell',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agNumberColumnFilter',
    },
    totalColumn: {
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: 'number-cell',
    },
},
    rowData: getRowData(),
    groupDefaultExpanded: 1
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

onCellValueChanged = (params) => {
    var changedData = [params.data];
    params.api.applyTransaction({ update: changedData });
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                

<div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine-dark">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
autoGroupColumnDef={this.state.autoGroupColumnDef}
columnTypes={this.state.columnTypes}
rowData={this.state.rowData}
groupDefaultExpanded={this.state.groupDefaultExpanded}
suppressAggFuncInHeader={true}
animateRows={true}
onGridReady={this.onGridReady}
onCellValueChanged={this.onCellValueChanged.bind(this)}
            />
            </div>
            </div>
        );
    }
}

function getRowData() {
    var rowData = [];
    for (var i = 1; i <= 10; i++) {
        rowData.push({
            group: i < 5 ? 'A' : 'B',
            a: (i * 863) % 100,
            b: (i * 811) % 100,
            c: (i * 743) % 100,
            d: (i * 677) % 100,
        });
    }
    return rowData;
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
