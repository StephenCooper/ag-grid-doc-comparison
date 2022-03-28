
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, RangeSelectionModule, ClipboardModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'athlete', minWidth: 200 },
    { field: 'age' },
    { field: 'country', minWidth: 150 },
    { field: 'year' },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
],
    defaultColDef: {
    editable: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
},
    rowSelection: 'multiple',
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

onBtCopyRows = () => {
    this.gridApi.copySelectedRowsToClipboard();
}

   onBtCopyRange = () => {
    this.gridApi.copySelectedRangeToClipboard();
}

   sendToClipboard = (params) => {
    console.log('send to clipboard called with data:');
    console.log(params.data);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{"paddingBottom":"5px"}}>
    <button onClick={() => this.onBtCopyRows()}>Copy Selected Rows to Clipboard</button>
    <button onClick={() => this.onBtCopyRange()}>Copy Selected Range to Clipboard</button>
</div>

<div
                
                style={{
                    height: '93%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
enableRangeSelection={true}
rowSelection={this.state.rowSelection}
sendToClipboard={this.sendToClipboard}
onGridReady={this.onGridReady}
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
