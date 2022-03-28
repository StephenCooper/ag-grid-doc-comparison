
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        headerName: 'Country',
        showRowGroup: 'country',
        cellRenderer: 'agGroupCellRenderer',
        minWidth: 200,
    },
    {
        headerName: 'Year',
        valueGetter: function (params) {
            if (params.data) {
                return params.data.year;
            }
        },
        showRowGroup: 'year',
        cellRenderer: 'agGroupCellRenderer',
    },
    { field: 'athlete', minWidth: 200 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'total', aggFunc: 'sum' },
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
],
    defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
},
    groupDisplayType: 'custom',
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
    }



    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div className="example-header">
        <span className="legend-item ag-row-level-0"></span>
        <span className="legend-label">Top Level Group</span>
        <span className="legend-item ag-row-level-1"></span>
        <span className="legend-label">Second Level Group</span>
        <span className="legend-item ag-row-level-2"></span>
        <span className="legend-label">Bottom Rows</span>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
groupDisplayType={this.state.groupDisplayType}
groupHideOpenParents={true}
enableRangeSelection={true}
animateRows={true}
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
