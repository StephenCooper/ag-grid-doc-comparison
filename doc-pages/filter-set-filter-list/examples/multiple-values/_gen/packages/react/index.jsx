
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
        headerName: 'Animals (array)',
        field: 'animalsArray',
        filter: 'agSetColumnFilter',
    },
    {
        headerName: 'Animals (string)',
        filter: 'agSetColumnFilter',
        valueGetter: valueGetter,
    },
    {
        headerName: 'Animals (objects)',
        field: 'animalsObjects',
        filter: 'agSetColumnFilter',
        valueFormatter: valueFormatter,
        keyCreator: keyCreator,
    },
],
    defaultColDef: {
    flex: 1,
},
    rowData: getData(),
    sideBar: 'filters'
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
sideBar={this.state.sideBar}
onGridReady={this.onGridReady}
            />
            </div>
            </div>
        );
    }
}

var valueGetter = function (params) {
    return params.data['animalsString'].split('|');
};
var valueFormatter = function (params) {
    return params.value
        .map(function (animal) {
        return animal.name;
    })
        .join(', ');
};
var keyCreator = function (params) {
    return params.value.map(function (animal) {
        return animal.name;
    });
};

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
