
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        field: 'athlete',
        filter: 'agTextColumnFilter',
        minWidth: 220,
    },
    {
        field: 'year',
        filter: 'agNumberColumnFilter',
        filterParams: {
            buttons: ['reset'],
            debounceMs: 1000,
            suppressAndOrCondition: true,
        },
    },
    { field: 'gold', type: 'number' },
    { field: 'silver', type: 'number' },
    { field: 'bronze', type: 'number' },
],
    defaultColDef: {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
    menuTabs: ['filterMenuTab'],
},
    columnTypes: {
    number: { filter: 'agNumberColumnFilter' },
},
    rowModelType: 'serverSide',
    serverSideStoreType: 'partial'
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
columnTypes={this.state.columnTypes}
rowModelType={this.state.rowModelType}
serverSideStoreType={this.state.serverSideStoreType}
animateRows={true}
onGridReady={this.onGridReady}
            />
            </div>
            </div>
        );
    }
}

function getServerSideDatasource(server) {
    return {
        getRows: function (params) {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            // get data for request from our fake server
            var response = server.getData(params.request);
            // simulating real server call with a 500ms delay
            setTimeout(function () {
                if (response.success) {
                    // supply rows for requested block to grid
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    params.fail();
                }
            }, 500);
        },
    };
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
