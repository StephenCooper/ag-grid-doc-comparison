
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import CustomPinnedRowRenderer from './customPinnedRowRenderer.jsx';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        field: 'athlete',
        cellRendererSelector: function (params) {
            if (params.node.rowPinned) {
                return {
                    component: CustomPinnedRowRenderer,
                    params: {
                        style: { color: 'blue' },
                    },
                };
            }
            else {
                // rows that are not pinned don't use any cell renderer
                return undefined;
            }
        },
    },
    {
        field: 'age',
        cellRendererSelector: function (params) {
            if (params.node.rowPinned) {
                return {
                    component: CustomPinnedRowRenderer,
                    params: {
                        style: { 'font-style': 'italic' },
                    },
                };
            }
            else {
                // rows that are not pinned don't use any cell renderer
                return undefined;
            }
        },
    },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
],
    defaultColDef: {
    width: 200,
    sortable: true,
    filter: true,
    resizable: true,
},
    rowData: null,
    getRowStyle: function (params) {
    if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
    }
},
    pinnedTopRowData: createData(1, 'Top'),
    pinnedBottomRowData: createData(1, 'Bottom')
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => params.api.setRowData(data);
        
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
    }

onPinnedRowTopCount = () => {
    var headerRowsToFloat = (document.getElementById('top-row-count')).value;
    var count = Number(headerRowsToFloat);
    var rows = createData(count, 'Top');
    this.gridApi.setPinnedTopRowData(rows);
}

   onPinnedRowBottomCount = () => {
    var footerRowsToFloat = (document.getElementById('bottom-row-count')).value;
    var count = Number(footerRowsToFloat);
    var rows = createData(count, 'Bottom');
    this.gridApi.setPinnedBottomRowData(rows);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div className="example-header">
        <span>
            Rows to Pin on Top:
        </span>
        <select onChange={() => this.onPinnedRowTopCount()} id="top-row-count" style={{"marginLeft":"10px","marginRight":"20px"}}>
            <option value="0">0</option>
           <option value="1" selected={true}>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <span>
            Rows to Pin on Bottom:
        </span>
        <select onChange={() => this.onPinnedRowBottomCount()} id="bottom-row-count" style={{"marginLeft":"10px"}}>
            <option value="0">0</option>
           <option value="1" selected={true}>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
rowData={this.state.rowData}
getRowStyle={this.state.getRowStyle}
pinnedTopRowData={this.state.pinnedTopRowData}
pinnedBottomRowData={this.state.pinnedBottomRowData}
onGridReady={this.onGridReady}
            />
            </div>
</div>

            </div>
        );
    }
}

function createData(count, prefix) {
    var result = [];
    for (var i = 0; i < count; i++) {
        result.push({
            athlete: prefix + ' Athlete ' + i,
            age: prefix + ' Age ' + i,
            country: prefix + ' Country ' + i,
            year: prefix + ' Year ' + i,
            date: prefix + ' Date ' + i,
            sport: prefix + ' Sport ' + i,
        });
    }
    return result;
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
