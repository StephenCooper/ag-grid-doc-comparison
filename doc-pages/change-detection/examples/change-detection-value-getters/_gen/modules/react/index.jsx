
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'a', type: 'valueColumn' },
    { field: 'b', type: 'valueColumn' },
    { field: 'c', type: 'valueColumn' },
    { field: 'd', type: 'valueColumn' },
    { field: 'e', type: 'valueColumn' },
    { field: 'f', type: 'valueColumn' },
    {
        headerName: 'Total',
        valueGetter: 'data.a + data.b + data.c + data.d + data.e + data.f',
        editable: false,
        cellClass: 'total-col',
    },
],
    defaultColDef: {
    flex: 1,
    sortable: true,
},
    columnTypes: {
    valueColumn: {
        editable: true,
        valueParser: 'Number(newValue)',
        filter: 'agNumberColumnFilter',
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
columnTypes={this.state.columnTypes}
rowData={this.state.rowData}
groupDefaultExpanded={this.state.groupDefaultExpanded}
suppressAggFuncInHeader={true}
enableCellChangeFlash={true}
animateRows={true}
onGridReady={this.onGridReady}
            />
            </div>
            </div>
        );
    }
}

function getRowData() {
    var rowData = [];
    for (var i = 1; i <= 20; i++) {
        rowData.push({
            group: i < 5 ? 'A' : 'B',
            a: (i * 863) % 100,
            b: (i * 811) % 100,
            c: (i * 743) % 100,
            d: (i * 677) % 100,
            e: (i * 619) % 100,
            f: (i * 571) % 100,
        });
    }
    return rowData;
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
