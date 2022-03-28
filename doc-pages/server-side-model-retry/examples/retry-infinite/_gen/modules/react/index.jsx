
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        // demonstrating the use of valueGetters
        colId: 'country',
        valueGetter: 'data.country',
        rowGroup: true,
        hide: true,
    },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'year', minWidth: 100 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
],
    defaultColDef: {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
},
    autoGroupColumnDef: {
    flex: 1,
    minWidth: 280,
    field: 'athlete',
},
    rowModelType: 'serverSide',
    serverSideStoreType: 'partial',
    maxConcurrentDatasourceRequests: 1,
    cacheBlockSize: 20
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => {
    // setup the fake server with entire dataset
    var fakeServer = new FakeServer(data);
    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api.setServerSideDatasource(datasource);
};
        
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
    }

onBtRetry = () => {
    this.gridApi.retryServerSideLoads();
}

   onBtReset = () => {
    this.gridApi.refreshServerSideStore({ purge: true });
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px"}}>
        <label><input type="checkbox" id="failLoad" /> Make Loads Fail</label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => this.onBtRetry()}>Retry Failed Loads</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => this.onBtReset()}>Reset Entire Grid</button>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine-dark">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
autoGroupColumnDef={this.state.autoGroupColumnDef}
rowModelType={this.state.rowModelType}
serverSideStoreType={this.state.serverSideStoreType}
maxConcurrentDatasourceRequests={this.state.maxConcurrentDatasourceRequests}
suppressAggFuncInHeader={true}
purgeClosedRowNodes={true}
cacheBlockSize={this.state.cacheBlockSize}
animateRows={true}
onGridReady={this.onGridReady}
            />
            </div>
</div>
            </div>
        );
    }
}

function getServerSideDatasource(server) {
    return {
        getRows: function (params) {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            var response = server.getData(params.request);
            // adding delay to simulate real server call
            setTimeout(function () {
                if (response.success) {
                    // call the success callback
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    // inform the grid request failed
                    params.fail();
                }
            }, 1000);
        },
    };
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
