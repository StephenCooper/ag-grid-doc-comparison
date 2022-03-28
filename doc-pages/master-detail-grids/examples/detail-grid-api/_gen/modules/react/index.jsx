
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule, MenuModule, ColumnsToolPanelModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
],
    detailRowHeight: 200,
    detailCellRendererParams: {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number', minWidth: 150 },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode', minWidth: 150 },
        ],
        defaultColDef: {
            flex: 1,
            editable: true,
            resizable: true,
        },
    },
    getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
    },
},
    getRowId: function (params) {
    // use 'account' as the row ID
    return params.data.account;
},
    defaultColDef: {
    flex: 1,
    editable: true,
    resizable: true,
},
    rowData: null
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => {
    this.setState({ rowData: data });
};
        
        fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
    }

onFirstDataRendered = (params) => {
    // expand the first two rows
    setTimeout(function () {
        params.api.forEachNode(function (node) {
            node.setExpanded(true);
        });
    }, 0);
}

   flashMilaSmithOnly = () => {
    // flash Mila Smith - we know her account is 177001 and we use the account for the row ID
    var detailGrid = this.gridApi.getDetailGridInfo('detail_177001');
    if (detailGrid) {
        detailGrid.api.flashCells();
    }
}

   flashAll = () => {
    this.gridApi.forEachDetailGridInfo(function (detailGridApi) {
        detailGridApi.api.flashCells();
    });
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{"display":"flex","flexDirection":"column","height":"100%"}}>
    <div style={{"paddingBottom":"4px"}}>
        <button onClick={() => this.flashMilaSmithOnly()}>Flash Mila Smith</button>
        <button onClick={() => this.flashAll()}>Flash All</button>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
masterDetail={true}
detailRowHeight={this.state.detailRowHeight}
detailCellRendererParams={this.state.detailCellRendererParams}
getRowId={this.state.getRowId}
defaultColDef={this.state.defaultColDef}
onGridReady={this.onGridReady}
onFirstDataRendered={this.onFirstDataRendered.bind(this)}
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
