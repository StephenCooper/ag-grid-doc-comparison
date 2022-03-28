
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
    { field: 'country', rowGroup: true, hide: true },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'age', minWidth: 120, aggFunc: 'sum' },
    { field: 'year', maxWidth: 120 },
    { field: 'date', minWidth: 150 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'total', aggFunc: 'sum' },
],
    defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
},
    autoGroupColumnDef: {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox: true,
    },
},
    rowSelection: 'multiple',
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

filterSwimming = () => {
    this.gridApi.setFilterModel({
        sport: {
            type: 'set',
            values: ['Swimming'],
        },
    });
}

   ages16And20 = () => {
    this.gridApi.setFilterModel({
        age: {
            type: 'set',
            values: ['16', '20'],
        },
    });
}

   clearFilter = () => {
    this.gridApi.setFilterModel(null);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px"}}>
        <button onClick={() => this.filterSwimming()}>Filter Only Swimming</button>
        <button onClick={() => this.ages16And20()}>Filter Only ages 16 and 20</button>
        <button onClick={() => this.clearFilter()} style={{"marginLeft":"10px"}}>Clear Filter</button>
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
rowSelection={this.state.rowSelection}
groupSelectsChildren={true}
groupSelectsFiltered={true}
suppressAggFuncInHeader={true}
suppressRowClickSelection={true}
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
