
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, ColumnsToolPanelModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        field: 'athlete',
        minWidth: 200,
        enableRowGroup: true,
        enablePivot: true,
    },
    {
        field: 'age',
        enableValue: true,
    },
    {
        field: 'country',
        minWidth: 200,
        enableRowGroup: true,
        enablePivot: true,
        rowGroupIndex: 1,
    },
    {
        field: 'year',
        enableRowGroup: true,
        enablePivot: true,
        pivotIndex: 1,
    },
    {
        field: 'date',
        minWidth: 180,
        enableRowGroup: true,
        enablePivot: true,
    },
    {
        field: 'sport',
        minWidth: 200,
        enableRowGroup: true,
        enablePivot: true,
        rowGroupIndex: 2,
    },
    {
        field: 'gold',
        hide: true,
        enableValue: true,
    },
    {
        field: 'silver',
        hide: true,
        enableValue: true,
        aggFunc: 'sum',
    },
    {
        field: 'bronze',
        hide: true,
        enableValue: true,
        aggFunc: 'sum',
    },
    {
        headerName: 'Total',
        field: 'totalAgg',
        valueGetter: 'node.group ? data.totalAgg : data.gold + data.silver + data.bronze',
    },
],
    defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
},
    autoGroupColumnDef: {
    minWidth: 250,
},
    sideBar: 'columns',
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
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

    (document.getElementById('read-only')).checked = true;

    }

setReadOnly = () => {
    this.gridApi.setFunctionsReadOnly((document.getElementById('read-only')).checked);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="test-container">
    <div className="test-header">
        <label><input type="checkbox" id="read-only" onChange={() => this.setReadOnly()} /> Functions Read Only</label>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
autoGroupColumnDef={this.state.autoGroupColumnDef}
pivotMode={true}
sideBar={this.state.sideBar}
rowGroupPanelShow={this.state.rowGroupPanelShow}
pivotPanelShow={this.state.pivotPanelShow}
functionsReadOnly={true}
onGridReady={this.onGridReady}
rowData={this.state.rowData}
            />
            </div>
</div>
            </div>
        );
    }
}



render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
