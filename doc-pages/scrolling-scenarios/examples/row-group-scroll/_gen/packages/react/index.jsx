
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
    { field: 'athlete', width: 150, rowGroupIndex: 0 },
    { field: 'age', width: 90, rowGroupIndex: 1 },
    { field: 'country', width: 120, rowGroupIndex: 2 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110, rowGroupIndex: 2 },
],
    rowData: null,
    groupDisplayType: 'groupRows',
    defaultColDef: {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => params.api.setRowData(data);
        
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
    }

onRowGroupOpened = (event) => {
    var rowNodeIndex = event.node.rowIndex;
    // factor in child nodes so we can scroll to correct position
    var childCount = event.node.childrenAfterSort
        ? event.node.childrenAfterSort.length
        : 0;
    var newIndex = rowNodeIndex + childCount;
    this.gridApi.ensureIndexVisible(newIndex);
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
rowData={this.state.rowData}
animateRows={false}
groupDisplayType={this.state.groupDisplayType}
defaultColDef={this.state.defaultColDef}
onGridReady={this.onGridReady}
onRowGroupOpened={this.onRowGroupOpened.bind(this)}
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
