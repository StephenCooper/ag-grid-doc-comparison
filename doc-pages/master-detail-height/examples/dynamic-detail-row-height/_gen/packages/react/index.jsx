
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
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
],
    defaultColDef: {
    flex: 1,
},
    detailCellRendererParams: {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number' },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode' },
        ],
        defaultColDef: {
            flex: 1,
        },
        onGridReady: function (params) {
            // using auto height to fit the height of the the detail grid
            params.api.setDomLayout('autoHeight');
        },
    },
    getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
    },
},
    getRowHeight: function (params) {
    if (params.node && params.node.detail) {
        var offset = 80;
        var allDetailRowHeight = params.data.callRecords.length *
            params.api.getSizesForCurrentTheme().rowHeight;
        var gridSizes = params.api.getSizesForCurrentTheme();
        return allDetailRowHeight + (gridSizes && gridSizes.headerHeight || 0) + offset;
    }
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
        
        fetch('https://www.ag-grid.com/example-assets/master-detail-dynamic-row-height-data.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
    }

onFirstDataRendered = (params) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
        params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
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
masterDetail={true}
detailCellRendererParams={this.state.detailCellRendererParams}
getRowHeight={this.state.getRowHeight}
onGridReady={this.onGridReady}
onFirstDataRendered={this.onFirstDataRendered.bind(this)}
rowData={this.state.rowData}
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
