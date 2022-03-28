
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import CustomHeaderGroup from './customHeaderGroup.jsx';
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
        headerName: 'Athlete Details',
        headerGroupComponent: CustomHeaderGroup,
        children: [
            { field: 'athlete', width: 150 },
            { field: 'age', width: 90, columnGroupShow: 'open' },
            {
                field: 'country',
                width: 120,
                columnGroupShow: 'open',
            },
        ],
    },
    {
        headerName: 'Medal details',
        headerGroupComponent: CustomHeaderGroup,
        children: [
            { field: 'year', width: 90 },
            { field: 'date', width: 110 },
            {
                field: 'sport',
                width: 110,
                columnGroupShow: 'open',
            },
            {
                field: 'gold',
                width: 100,
                columnGroupShow: 'open',
            },
            {
                field: 'silver',
                width: 100,
                columnGroupShow: 'open',
            },
            {
                field: 'bronze',
                width: 100,
                columnGroupShow: 'open',
            },
            {
                field: 'total',
                width: 100,
                columnGroupShow: 'open',
            },
        ],
    },
],
    rowData: null,
    defaultColDef: {
    width: 100,
    resizable: true,
}
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
rowData={this.state.rowData}
defaultColDef={this.state.defaultColDef}
onGridReady={this.onGridReady}
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
