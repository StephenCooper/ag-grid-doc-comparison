
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
    {
        headerName: 'Participants',
        children: [
            { field: 'athlete', minWidth: 200 },
            { field: 'age' },
            { field: 'country', minWidth: 150 },
        ]
    },
    {
        headerName: 'Olympic Games',
        children: [
            { field: 'year' },
            { field: 'date', minWidth: 150 },
            { field: 'sport', minWidth: 150 },
            { field: 'gold' },
            { field: 'silver', suppressPaste: true },
            { field: 'bronze' },
            { field: 'total' },
        ]
    }
],
    defaultColDef: {
    editable: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
},
    clipboardDelimiter: ',',
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
clipboardDelimiter={this.state.clipboardDelimiter}
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
