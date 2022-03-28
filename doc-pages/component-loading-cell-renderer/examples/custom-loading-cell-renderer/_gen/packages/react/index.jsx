
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CustomLoadingCellRenderer from './customLoadingCellRenderer.jsx';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'id' },
    { field: 'athlete', width: 150 },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
],
    defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
},
    loadingCellRenderer: CustomLoadingCellRenderer,
    loadingCellRendererParams: {
    loadingMessage: 'One moment please...',
},
    rowModelType: 'serverSide',
    serverSideStoreType: 'partial',
    cacheBlockSize: 100,
    maxBlocksInCache: 10
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => {
    // add id to data
    let idSequence = 0;
    data.forEach((item) => {
        item.id = idSequence++;
    });
    const server = getFakeServer(data);
    const datasource = getServerSideDatasource(server);
    params.api.setServerSideDatasource(datasource);
};
        
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
    }



    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{"height":"100%","paddingTop":"25px","boxSizing":"border-box"}}>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
loadingCellRenderer={this.state.loadingCellRenderer}
loadingCellRendererParams={this.state.loadingCellRendererParams}
rowModelType={this.state.rowModelType}
serverSideStoreType={this.state.serverSideStoreType}
cacheBlockSize={this.state.cacheBlockSize}
maxBlocksInCache={this.state.maxBlocksInCache}
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
        getRows: params => {
            // adding delay to simulate real server call
            setTimeout(() => {
                const response = server.getResponse(params.request);
                if (response.success) {
                    // call the success callback
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    // inform the grid request failed
                    params.fail();
                }
            }, 2000);
        },
    };
}
function getFakeServer(allData) {
    return {
        getResponse: (request) => {
            console.log('asking for rows: ' + request.startRow + ' to ' + request.endRow);
            // take a slice of the total rows
            const rowsThisPage = allData.slice(request.startRow, request.endRow);
            // if on or after the last page, work out the last row.
            const lastRow = allData.length <= (request.endRow || 0) ? allData.length : -1;
            return {
                success: true,
                rows: rowsThisPage,
                lastRow: lastRow,
            };
        },
    };
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
