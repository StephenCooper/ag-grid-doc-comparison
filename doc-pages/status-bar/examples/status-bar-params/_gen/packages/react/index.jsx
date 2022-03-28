
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
    { field: 'athlete', minWidth: 200 },
    { field: 'age' },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'date', minWidth: 180 },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
],
    defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
},
    statusBar: {
    statusPanels: [
        {
            statusPanel: 'agAggregationComponent',
            statusPanelParams: {
                // possible values are: 'count', 'sum', 'min', 'max', 'avg'
                aggFuncs: ['sum', 'avg'],
            },
        },
    ],
},
    rowData: null
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

onFirstDataRendered = (event) => {
    event.api.addCellRange({
        rowStartIndex: 3,
        rowEndIndex: 8,
        columns: ['age'],
    });
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
enableRangeSelection={true}
statusBar={this.state.statusBar}
onGridReady={this.onGridReady}
onFirstDataRendered={this.onFirstDataRendered.bind(this)}
rowData={this.state.rowData}
            />
            </div>

            </div>
        );
    }
}



render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
