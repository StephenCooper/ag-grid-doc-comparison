
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

start = () => {
    if (intervalId) {
        return;
    }
    const updateData = () => {
        const itemsToUpdate = [];
        this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode) {
            const data = rowNode.data;
            const n = data.change.length;
            const v = Math.random() > 0.5 ? Number(Math.random()) : -Number(Math.random());
            data.change = [...data.change.slice(1, n), v];
            itemsToUpdate.push(data);
        });
        this.gridApi.applyTransaction({ update: itemsToUpdate });
    };
    intervalId = setInterval(updateData, 300);
}

   stop = () => {
    if (intervalId === undefined) {
        return;
    }
    clearInterval(intervalId);
    intervalId = undefined;
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{"height":"100%","display":"flex","flexDirection":"column"}}>
    <div style={{"marginBottom":"4px"}}>
        <button onClick={() => this.start()}>► Start</button>
        <button onClick={() => this.stop()}>■ Stop</button>
    </div>
    <div style={{"flexGrow":"1"}}>
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
</div>
            </div>
        );
    }
}

var intervalId;

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
