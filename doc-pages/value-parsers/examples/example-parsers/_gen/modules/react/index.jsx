
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
    { headerName: 'Name', field: 'simple' },
    { headerName: 'Bad Number', field: 'numberBad' },
    {
        headerName: 'Good Number',
        field: 'numberGood',
        valueParser: numberParser,
    },
],
    defaultColDef: {
    flex: 1,
    editable: true,
    resizable: true,
},
    rowData: getData()
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    }

onCellValueChanged = (event) => {
    console.log('data after changes is: ', event.data);
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
rowData={this.state.rowData}
onGridReady={this.onGridReady}
onCellValueChanged={this.onCellValueChanged.bind(this)}
            />
            </div>
            </div>
        );
    }
}

function numberParser(params) {
    return Number(params.newValue);
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
