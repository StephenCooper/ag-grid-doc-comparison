
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
            rowData: [
    { value: 'value 1' },
    { value: 'value 1' },
    { value: 'value 1' },
    { value: 'value 1' },
    { value: 'value 2' },
    { value: 'value 2' },
    { value: 'value 2' },
    { value: 'value 2' },
    { value: 'value 2' },
],
    columnDefs: [
    {
        headerName: 'Set filter column',
        field: 'value',
        flex: 1,
        filter: 'agSetColumnFilter',
        floatingFilter: true,
        filterParams: filterParams,
    },
]
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
                rowData={this.state.rowData}
columnDefs={this.state.columnDefs}
onGridReady={this.onGridReady}
            />
            </div>
            </div>
        );
    }
}

var filterParams = {
    values: function (params) {
        setTimeout(function () {
            params.success(['value 1', 'value 2']);
        }, 3000);
    },
};

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
