
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
        headerName: 'Age (No Comparator)',
        field: 'age',
        filter: 'agSetColumnFilter',
    },
    {
        headerName: 'Age (With Comparator)',
        field: 'age',
        filter: 'agSetColumnFilter',
        filterParams: filterParams,
    },
],
    defaultColDef: {
    flex: 1,
    filter: true,
    resizable: true,
},
    rowData: getRowData(),
    sideBar: 'filters'
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    ((params.api.getToolPanelInstance('filters'))).expandFilters();

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

var filterParams = {
    comparator: function (a, b) {
        var valA = parseInt(a);
        var valB = parseInt(b);
        if (valA === valB)
            return 0;
        return valA > valB ? 1 : -1;
    },
};
function getRowData() {
    var rows = [];
    for (var i = 1; i < 117; i++) {
        rows.push({ age: i });
    }
    return rows;
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
