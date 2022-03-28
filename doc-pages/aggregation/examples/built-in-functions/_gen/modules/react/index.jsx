
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    {
        field: 'gold',
        aggFunc: 'sum',
        enableValue: true,
        allowedAggFuncs: ['sum', 'min', 'max'],
    },
    { field: 'silver', aggFunc: 'min', enableValue: true },
    { field: 'bronze', aggFunc: 'max', enableValue: true },
    { field: 'total', aggFunc: 'avg', enableValue: true, minWidth: 200 },
    { field: 'age' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
],
    defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
},
    autoGroupColumnDef: {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer'
},
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
                <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
autoGroupColumnDef={this.state.autoGroupColumnDef}
sideBar={true}
onGridReady={this.onGridReady}
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
