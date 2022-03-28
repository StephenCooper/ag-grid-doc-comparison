
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule])

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
