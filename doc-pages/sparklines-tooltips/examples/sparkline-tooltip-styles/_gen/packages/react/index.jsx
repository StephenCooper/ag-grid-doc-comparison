
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
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
        field: 'change',
        cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
            sparklineOptions: {
                tooltip: {
                    renderer: tooltipRenderer,
                },
                line: {
                    stroke: 'rgb(103,103,255)',
                    strokeWidth: 1,
                },
                highlightStyle: {
                    fill: 'white',
                    strokeWidth: 0,
                },
            },
        },
    },
    {
        field: 'volume',
        type: 'numericColumn',
        maxWidth: 140,
    },
],
    defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
},
    rowData: getData(),
    rowHeight: 50
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
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
rowData={this.state.rowData}
rowHeight={this.state.rowHeight}
onGridReady={this.onGridReady}
            />
            </div>
            </div>
        );
    }
}

function tooltipRenderer(params) {
    return {
        title: params.context.data.symbol,
        // sets styles for tooltip
        color: 'white',
        backgroundColor: 'rgb(78,78,255)',
        opacity: 0.7,
    };
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
